'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { getPusherClient } from '@/lib/pusher'
import dynamic from 'next/dynamic'
import MessageBubble from './MessageBubble'
import GroupInfoPanel from './GroupInfoPanel'
import GroupSettings from './GroupSettings'
import EmojiPickerPopup from './EmojiPickerPopup'
import VoiceRecorder from './VoiceRecorder'
import styles from './ChatWindow.module.css'

const ACCEPTED = 'image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/quicktime'

export default function ChatWindow({ conversationId }) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState([])
  const [conversation, setConversation] = useState(null)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [showGroupInfo, setShowGroupInfo] = useState(false)
  const [showGroupSettings, setShowGroupSettings] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)
  const [showCompatibilityPopup, setShowCompatibilityPopup] = useState(false)
  const [compatibilityData, setCompatibilityData] = useState(null)
  const [compatibilityLoading, setCompatibilityLoading] = useState(false)
  const [uploadPreview, setUploadPreview] = useState(null) // { file, previewUrl, type }
  const [uploading, setUploading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const fileInputRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  const fetchConversation = useCallback(async () => {
    const res = await fetch(`/api/conversations/${conversationId}`)
    if (res.ok) setConversation(await res.json())
  }, [conversationId])

  const fetchCompatibility = useCallback(async () => {
    if (!conversationId || conversation?.type === 'group') return

    setCompatibilityLoading(true)
    try {
      const res = await fetch(`/api/compatibility/${conversationId}`)
      const data = await res.json()
      if (res.ok) {
        setCompatibilityData(data)
      } else {
        setCompatibilityData({ success: false, message: data?.message || 'Unable to fetch compatibility data.' })
      }
    } catch (error) {
      console.error('Compatibility fetch failed:', error)
      setCompatibilityData({ success: false, message: 'Compatibility analysis unavailable right now.' })
    } finally {
      setCompatibilityLoading(false)
    }
  }, [conversation?.type, conversationId])

  useEffect(() => { fetchConversation() }, [fetchConversation])
  useEffect(() => {
    const interval = setInterval(() => fetchConversation(), 30000)
    return () => clearInterval(interval)
  }, [fetchConversation])
  useEffect(() => {
    if (conversation?.type !== 'group') {
      fetchCompatibility()
    }
  }, [conversation?.type, fetchCompatibility])
  const fetchMessages = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/messages?conversationId=${conversationId}`)
    if (res.ok) {
      const data = await res.json()
      setMessages(data.messages)
    }
    setLoading(false)
  }, [conversationId])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!conversationId) return
    const pusher = getPusherClient()
    const channel = pusher.subscribe(`conversation-${conversationId}`)
    channel.bind('new-message', ({ message }) => {
      setMessages(prev => {
        if (prev.some(m => m._id === message._id)) return prev
        return [...prev, message]
      })
    })
    channel.bind('message-deleted', ({ messageId }) => {
      setMessages(prev => prev.map(msg =>
        msg._id === messageId ? { ...msg, deleted: true, content: '' } : msg
      ))
    })
    channel.bind('user-typing', ({ userId }) => {
      if (userId !== session?.user?.id) {
        setIsTyping(true)
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000)
      }
    })
    return () => {
      channel.unbind_all()
      pusher.unsubscribe(`conversation-${conversationId}`)
    }
  }, [conversationId, session?.user?.id])

  async function sendTextMessage() {
    const text = input.trim()
    if (!text || sending) return
    setInput('')
    setSending(true)
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, content: text, type: 'text' }),
    })
    setSending(false)
    inputRef.current?.focus()
  }

  async function sendMediaMessage() {
    if (!uploadPreview || uploading) return
    setUploading(true)

    try {
      // 1. Upload to Cloudinary
      const formData = new FormData()
      formData.append('file', uploadPreview.file)
      formData.append('folder', 'textme/media')
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!uploadRes.ok) throw new Error('Upload failed')
      const uploaded = await uploadRes.json()

      // 2. Send message with media URL
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          content: input.trim(),
          type: uploaded.resourceType,
          mediaUrl: uploaded.url,
          mediaType: uploaded.resourceType,
          mediaWidth: uploaded.width,
          mediaHeight: uploaded.height,
          mediaDuration: uploaded.duration,
        }),
      })

      setInput('')
      setUploadPreview(null)
    } catch (err) {
      console.error(err)
    }
    setUploading(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (uploadPreview) sendMediaMessage()
      else sendTextMessage()
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const isVideo = file.type.startsWith('video/')
    const previewUrl = URL.createObjectURL(file)
    setUploadPreview({ file, previewUrl, type: isVideo ? 'video' : 'image' })
    e.target.value = ''
  }

  function removePreview() {
    if (uploadPreview?.previewUrl) URL.revokeObjectURL(uploadPreview.previewUrl)
    setUploadPreview(null)
  }

  async function sendVoiceMessage({ audioUrl, audioDuration }) {
    if (!conversationId || !audioUrl || sending) return
    setSending(true)
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          content: '',
          type: 'audio',
          mediaUrl: audioUrl,
          mediaType: 'audio',
          mediaDuration: audioDuration,
        }),
      })
      setShowVoiceRecorder(false)
    } catch (err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  async function handleDeleteMessage(messageId) {
    if (!messageId || !window.confirm('Delete this message?')) return
    const res = await fetch(`/api/messages/${messageId}`, { method: 'DELETE' })
    if (res.ok) {
      setMessages(prev => prev.map(msg =>
        msg._id === messageId ? { ...msg, deleted: true, content: '' } : msg
      ))
    }
  }

  function appendEmoji(emoji) {
    setInput(prev => prev + emoji)
    inputRef.current?.focus()
  }

  function getOtherParticipant() {
    return conversation?.participants?.find(p => p._id !== session?.user?.id)
      || conversation?.participants?.[0]
  }

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  function groupByDate() {
    const groups = []
    let lastDate = null
    messages.forEach(msg => {
      const date = new Date(msg.createdAt).toDateString()
      if (date !== lastDate) {
        groups.push({ type: 'date', date, key: date + msg._id })
        lastDate = date
      }
      groups.push({ type: 'message', data: msg, key: msg._id })
    })
    return groups
  }

  function formatDateLabel(dateStr) {
    const d = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (d.toDateString() === today.toDateString()) return 'Today'
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  }

  const isGroup = conversation?.type === 'group'
  const other = !isGroup ? getOtherParticipant() : null
  const headerName = isGroup ? conversation?.name : other?.name
  const headerAvatar = isGroup ? conversation?.avatar : other?.avatar
  const isRecentlyActive = !!other?.lastSeen && Date.now() - new Date(other.lastSeen).getTime() < 2 * 60 * 1000
  const presenceClass = isGroup
    ? ''
    : other?.status === 'away'
      ? 'away'
      : other?.status === 'online' && isRecentlyActive
        ? 'online'
        : 'offline'
  const presenceLabel = isGroup
    ? `${conversation?.participants?.length || 0} members`
    : other?.status === 'away'
      ? 'Away'
      : other?.status === 'online' && isRecentlyActive
        ? 'Active now'
        : 'Offline'
  const headerSub = isGroup ? `${conversation?.participants?.length || 0} members` : presenceLabel

  const canSend = uploadPreview ? !uploading : !!input.trim() && !sending
  const compatibilityScore = compatibilityData?.data?.compatibilityScore ?? null
  const compatibilityDetails = compatibilityData?.data ?? compatibilityData ?? {}
  const analytics = compatibilityDetails?.analytics ?? {}
  const suggestions = Array.isArray(compatibilityDetails?.aiSuggestions)
    ? compatibilityDetails.aiSuggestions.filter(Boolean)
    : compatibilityDetails?.suggestedReply
      ? [compatibilityDetails.suggestedReply]
      : []
  const scorePercent = Math.max(0, Math.min(100, Number(compatibilityScore ?? 0)))

  return (
    <div className={styles.windowWrap}>
      <div className={styles.chatWindow}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerAvatar}>
              {isGroup
                ? headerAvatar
                  ? <span className={styles.groupAvatarEmoji}>{headerAvatar}</span>
                  : <span>{getInitials(headerName)}</span>
                : other?.avatar
                  ? <img src={other.avatar} alt={other.name} />
                  : <span>{getInitials(other?.name || '')}</span>
              }
              {!isGroup && (
                <span className={`${styles.headerStatus} ${styles[presenceClass]}`} />
              )}
            </div>
            <div className={styles.headerInfo}>
              <span className={styles.headerName}>{headerName}</span>
              <span className={styles.headerSub}>{headerSub}</span>
            </div>
          </div>
          <div className={styles.headerActions}>
            {!isGroup && (
              <button
                className={styles.compatibilityBtn}
                type="button"
                onClick={async () => {
                  await fetchCompatibility()
                  setShowCompatibilityPopup(true)
                }}
                title="View compatibility analysis"
              >
                {compatibilityLoading ? '…' : `Compat ${compatibilityScore ?? '--'}`}
              </button>
            )}
            {isGroup && (
              <>
                <button
                  className={`${styles.headerBtn} ${showGroupInfo ? styles.headerBtnActive : ''}`}
                  title="Group info"
                  onClick={() => { setShowGroupInfo(p => !p); setShowGroupSettings(false) }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                </button>
                <button
                  className={`${styles.headerBtn} ${showGroupSettings ? styles.headerBtnActive : ''}`}
                  title="Group settings"
                  onClick={() => { setShowGroupSettings(p => !p); setShowGroupInfo(false) }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.2 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.2 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.2a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.2l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.2-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.2a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.2-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.2h.1a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.2a1.7 1.7 0 001 1.5h.1a1.7 1.7 0 001.8-.2l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.2 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.2a1.7 1.7 0 00-1.5 1z"/></svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {loading ? (
            <div className={styles.loadingCenter}><span className="spinner" /></div>
          ) : messages.length === 0 ? (
            <div className={styles.emptyChat}>
              <div className={styles.emptyChatAvatar}>
                {isGroup
                  ? headerAvatar ? <span style={{fontSize:28}}>{headerAvatar}</span> : <span>{getInitials(headerName || '')}</span>
                  : other?.avatar ? <img src={other.avatar} alt={other.name} /> : <span>{getInitials(other?.name || '')}</span>
                }
              </div>
              <p className={styles.emptyChatName}>{headerName}</p>
              <p className={styles.emptyChatHint}>
                {isGroup ? `This is the beginning of ${conversation?.name}` : 'Send a message to start the conversation'}
              </p>
            </div>
          ) : (
            <>
              {groupByDate().map(item => {
                if (item.type === 'date') return (
                  <div key={item.key} className={styles.dateSeparator}><span>{formatDateLabel(item.date)}</span></div>
                )
                const isOwn = item.data.sender?._id === session?.user?.id || item.data.sender === session?.user?.id
                return (
                  <MessageBubble
                    key={item.key}
                    message={item.data}
                    isOwn={isOwn}
                    showSender={isGroup && !isOwn}
                    isSystemMsg={item.data.type === 'system'}
                    onDelete={handleDeleteMessage}
                  />
                )
              })}
              {isTyping && (
                <div className={styles.typingIndicator}><span /><span /><span /></div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Upload preview */}
        {uploadPreview && (
          <div className={styles.uploadPreview}>
            <div className={styles.previewMedia}>
              {uploadPreview.type === 'image'
                ? <img src={uploadPreview.previewUrl} alt="Preview" />
                : <video src={uploadPreview.previewUrl} />
              }
              <div className={styles.previewType}>
                {uploadPreview.type === 'video' ? '▶ Video' : '🖼 Image'}
              </div>
            </div>
            <button className={styles.previewRemove} onClick={removePreview} title="Remove">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        )}

        {showVoiceRecorder && (
          <div className={styles.uploadPreview}>
            <VoiceRecorder
              onSend={sendVoiceMessage}
              onCancel={() => setShowVoiceRecorder(false)}
            />
          </div>
        )}

        {/* Input area */}
        <div className={styles.inputArea}>
          <div className={styles.inputRow}>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED}
              className={styles.hiddenInput}
              onChange={handleFileChange}
            />

            {/* Voice recorder button */}
            <button
              className={styles.toolBtn}
              onClick={() => setShowVoiceRecorder(p => !p)}
              title="Record voice note"
              type="button"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
                <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
              </svg>
            </button>

            {/* Attachment button */}
            <button
              className={styles.toolBtn}
              onClick={() => fileInputRef.current?.click()}
              title="Attach image or video"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </button>

            {/* Input wrap */}
            <div className={styles.inputWrap}>
              <textarea
                ref={inputRef}
                className={`${styles.input  }`}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={uploadPreview ? 'Add a caption…' : `Message ${headerName || ''}…`}
                rows={1}
                style={{ resize: 'none' }}
              />

              {/* Emoji button */}
              <div className={styles.emojiWrap}>
                <button
                  className={`${styles.emojiBtn} ${showEmoji ? styles.emojiBtnActive : ''}`}
                  onClick={() => setShowEmoji(p => !p)}
                  title="Emoji"
                  type="button"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </button>
                {showEmoji && (
                  <EmojiPickerPopup
                    onSelect={appendEmoji}
                    onClose={() => setShowEmoji(false)}
                  />
                )}
              </div>
            </div>

            {/* Send button */}
            <button
              className={`${styles.sendBtn} ${canSend ? styles.sendActive : ''}`}
              onClick={uploadPreview ? sendMediaMessage : sendTextMessage}
              disabled={!canSend}
            >
              {uploading
                ? <span className="spinner" style={{width:14,height:14,borderTopColor:'#0a1a18'}} />
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
                  </svg>
              }
            </button>
          </div>
          <p className={styles.inputHint}>Enter to send · Shift+Enter for new line</p>
        </div>
      </div>

      {isGroup && showGroupInfo && conversation && (
        <GroupInfoPanel
          conversation={conversation}
          onClose={() => setShowGroupInfo(false)}
          onUpdated={(updated) => setConversation(updated)}
        />
      )}

      {isGroup && showGroupSettings && conversation && (
        <GroupSettings
          conversation={conversation}
          onClose={() => setShowGroupSettings(false)}
          onUpdated={(updated) => setConversation(updated)}
        />
      )}

      {!isGroup && showCompatibilityPopup && (
        <div className={styles.compatibilityOverlay} onClick={() => setShowCompatibilityPopup(false)}>
          <div className={styles.compatibilityModal} onClick={e => e.stopPropagation()}>
            <div className={styles.compatibilityHeader}>
              <div>
                <p className={styles.compatibilityEyebrow}>Compatibility analysis</p>
                <h3 className={styles.compatibilityTitle}>Live response from the compatibility route</h3>
              </div>
              <button
                className={styles.compatibilityClose}
                type="button"
                onClick={() => setShowCompatibilityPopup(false)}
                aria-label="Close compatibility popup"
              >
                ×
              </button>
            </div>

            <div className={styles.compatibilityBody}>
              {compatibilityLoading ? (
                <p className={styles.compatibilityHint}>Loading latest compatibility data…</p>
              ) : compatibilityData ? (
                <div className={styles.compatibilityContent}>
                  <section className={styles.compatibilityHero}>
                    <div>
                      <p className={styles.compatibilityEyebrow}>Compatibility score</p>
                      <h4 className={styles.compatibilityScoreLabel}>{scorePercent}% match</h4>
                    </div>
                    <span className={styles.compatibilityPill}>{compatibilityDetails?.mood || 'Neutral'}</span>
                  </section>

                  <div className={styles.compatibilityMeter}>
                    <div className={styles.compatibilityMeterFill} style={{ width: `${scorePercent}%` }} />
                  </div>

                  <div className={styles.compatibilityChips}>
                    <span className={styles.compatibilityChip}>Type: {compatibilityDetails?.relationshipType || 'Unknown'}</span>
                    <span className={styles.compatibilityChip}>Engagement: {compatibilityDetails?.engagementLevel || 'Medium'}</span>
                    <span className={styles.compatibilityChip}>Mood: {compatibilityDetails?.mood || 'Neutral'}</span>
                  </div>

                  <div className={styles.compatibilityCards}>
                    <article className={styles.compatibilityCard}>
                      <h5 className={styles.compatibilityCardTitle}>What this means</h5>
                      <p className={styles.compatibilityCardText}>{compatibilityDetails?.futurePrediction || 'No prediction available yet.'}</p>
                    </article>

                    <article className={styles.compatibilityCard}>
                      <h5 className={styles.compatibilityCardTitle}>Signal breakdown</h5>
                      <ul className={styles.compatibilityList}>
                        <li><strong>Positivity</strong> <span>{analytics?.positivity ?? analytics?.positiveMessages ?? 0}%</span></li>
                        <li><strong>Dryness</strong> <span>{analytics?.dryness ?? analytics?.dryMessages ?? 0}%</span></li>
                        <li><strong>Emotional connection</strong> <span>{analytics?.emotionalConnection ?? 0}%</span></li>
                      </ul>
                    </article>
                  </div>

                  {suggestions.length > 0 && (
                    <article className={styles.compatibilityCard}>
                      <h5 className={styles.compatibilityCardTitle}>Suggested reply</h5>
                      <ul className={styles.compatibilitySuggestionList}>
                        {suggestions.map((item, idx) => (
                          <li key={`${item}-${idx}`}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  )}
                </div>
              ) : (
                <p className={styles.compatibilityHint}>No compatibility data available yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
