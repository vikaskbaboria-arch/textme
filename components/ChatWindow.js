'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { getPusherClient } from '@/lib/pusher'
import MessageBubble from './MessageBubble'
import styles from './ChatWindow.module.css'

export default function ChatWindow({ conversationId }) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState([])
  const [conversation, setConversation] = useState(null)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  // Fetch conversation details
  useEffect(() => {
    async function fetchConversation() {
      const res = await fetch('/api/conversations')
      if (res.ok) {
        const convs = await res.json()
        const conv = convs.find(c => c._id === conversationId)
        setConversation(conv)
      }
    }
    fetchConversation()
  }, [conversationId])

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/messages?conversationId=${conversationId}`)
    if (res.ok) {
      const data = await res.json()
      setMessages(data.messages)
    }
    setLoading(false)
  }, [conversationId])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Pusher subscription
  useEffect(() => {
    if (!conversationId) return

    const pusher = getPusherClient()
    const channel = pusher.subscribe(`conversation-${conversationId}`)

    channel.bind('new-message', ({ message }) => {
      setMessages(prev => {
        // Avoid duplicates
        if (prev.some(m => m._id === message._id)) return prev
        return [...prev, message]
      })
    })

    channel.bind('user-typing', ({ userId, name }) => {
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

  async function sendMessage(e) {
    e?.preventDefault()
    const text = input.trim()
    if (!text || sending) return

    setInput('')
    setSending(true)

    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, content: text }),
    })

    setSending(false)
    inputRef.current?.focus()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function getOtherParticipant() {
    return conversation?.participants?.find(p => p._id !== session?.user?.id)
      || conversation?.participants?.[0]
  }

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  const other = getOtherParticipant()

  // Group messages by date
  function groupMessages() {
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

  return (
    <div className={styles.chatWindow}>
      {/* Header */}
      <div className={styles.header}>
        {other && (
          <>
            <div className={styles.headerAvatar}>
              {other.avatar
                ? <img src={other.avatar} alt={other.name} />
                : <span>{getInitials(other.name)}</span>
              }
              <span className={`${styles.headerStatus} ${ other.status || 'offline'}`} />
            </div>
            <div className={styles.headerInfo}>
              <span className={styles.headerName}>{other.name}</span>
              <span className={styles.headerSub}>
                {other.status === 'online' ? 'Active now' : 'Offline'}
              </span>
            </div>
          </>
        )}
        <div className={styles.headerActions}>
          <button className={styles.headerBtn} title="Search in conversation">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className={styles.headerBtn} title="More options">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="5" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="19" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {loading ? (
          <div className={styles.loadingCenter}>
            <span className="spinner" />
          </div>
        ) : messages.length === 0 ? (
          <div className={styles.emptyChat}>
            <div className={styles.emptyChatAvatar}>
              {other?.avatar
                ? <img src={other?.avatar} alt={other?.name} />
                : <span>{getInitials(other?.name || '')}</span>
              }
            </div>
            <p className={styles.emptyChatName}>{other?.name}</p>
            <p className={styles.emptyChatHint}>Send a message to start the conversation</p>
          </div>
        ) : (
          <>
            {groupMessages().map(item => {
              if (item.type === 'date') {
                return (
                  <div key={item.key} className={styles.dateSeparator}>
                    <span>{formatDateLabel(item.date)}</span>
                  </div>
                )
              }
              return (
                <MessageBubble
                  key={item.key}
                  message={item.data}
                  isOwn={item.data.sender?._id === session?.user?.id || item.data.sender === session?.user?.id}
                />
              )
            })}

            {isTyping && (
              <div className={styles.typingIndicator}>
                <span /><span /><span />
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className={styles.inputArea}>
        <div className={styles.inputWrap}>
          <textarea
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${other?.name || ''}…`}
            rows={1}
            style={{ resize: 'none' }}
          />
          <button
            className={`${styles.sendBtn} ${input.trim() ? styles.sendActive : ''}`}
            onClick={sendMessage}
            disabled={!input.trim() || sending}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </div>
        <p className={styles.inputHint}>Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}
