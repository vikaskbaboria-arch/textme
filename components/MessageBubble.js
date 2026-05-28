'use client'
import { useEffect, useRef, useState } from 'react'
import MediaLightbox from './MediaLightbox'
import ShareMessageMenu from './ShareMessageMenu'
import styles from './MessageBubble.module.css'

export default function MessageBubble({ message, isOwn, showSender, isSystemMsg, onDelete }) {
  const [lightbox, setLightbox] = useState(null)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true,
    })
  }

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  function formatDuration(s) {
    if (!s || Number.isNaN(s)) return ''
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  function formatTimeLabel(seconds) {
    const safe = Math.max(0, Math.floor(seconds || 0))
    const m = Math.floor(safe / 60)
    const sec = safe % 60
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      const current = audio.currentTime || 0
      const total = audio.duration || 0
      setProgress(total ? (current / total) * 100 : 0)
      setDuration(total)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      audio.currentTime = 0
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadedmetadata', handleTimeUpdate)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadedmetadata', handleTimeUpdate)
    }
  }, [])

  if (isSystemMsg) {
    return (
      <div className={styles.systemMsg}>
        <span>{message.content}</span>
      </div>
    )
  }

  const sender = message.sender
  const isMedia = message.type === 'image' || message.type === 'video'
  const isAudio = message.type === 'audio'
  const isWithinDeleteWindow = Date.now() - new Date(message.createdAt).getTime() < 5 * 60 * 1000
  const canDelete = isOwn && !message.deleted && isWithinDeleteWindow
  const isRead = Array.isArray(message.readBy) && message.readBy.length > 1

  return (
    <>
      <div className={`${styles.row} ${isOwn ? styles.rowOwn : styles.rowOther}`}>
        {!isOwn && (
          <div className={styles.avatar}>
            {sender?.avatar ? (
              <img src={sender.avatar} alt={sender.name} />
            ) : (
              <span>{getInitials(sender?.name || '?')}</span>
            )}
          </div>
        )}

        <div className={styles.bubbleWrap}>
          {showSender && sender?.name && <span className={styles.senderName}>{sender.name}</span>}

          {isAudio ? (
            message.deleted ? (
              <div className={`${styles.bubble} ${isOwn ? styles.bubbleOwn : styles.bubbleOther}`}>
                <span className={styles.deleted}>This message was deleted</span>
              </div>
            ) : (
              <div className={`${styles.audioBubble} ${isOwn ? styles.audioBubbleOwn : styles.audioBubbleOther}`}>
                <div className={styles.audioHeader}>Voice note</div>
                <div className={styles.audioPlayerCard}>
                  <button
                    type="button"
                    className={`${styles.audioPlayBtn} ${isPlaying ? styles.audioPlayBtnActive : ''}`}
                    onClick={togglePlayback}
                    aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
                  >
                    {isPlaying ? '❚❚' : '▶'}
                  </button>
                  <div className={styles.audioWaveTrack}>
                    <div className={styles.audioWaveFill} style={{ width: `${progress}%` }} />
                  </div>
                  <span className={styles.audioTimeLabel}>{formatTimeLabel(duration ? duration * (progress / 100) : 0)}</span>
                </div>
                <audio ref={audioRef} src={message.mediaUrl} preload="metadata" />
                {message.mediaDuration && <span className={styles.audioDuration}>{formatDuration(message.mediaDuration)}</span>}
                <div className={styles.metaMedia}>
                  <span className={styles.time}>{formatTime(message.createdAt)}</span>
                  {!message.deleted && (
                    <button
                      type="button"
                      className={styles.shareBtn}
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowShareMenu(prev => !prev)
                      }}
                      title="Share this message"
                      aria-label="Share this message"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"/>
                      </svg>
                    </button>
                  )}
                  {isOwn && (
                    <>
                      {canDelete && (
                        <button type="button" className={styles.deleteBtn} onClick={() => onDelete?.(message._id)} title="Delete message" disabled={message.deleted}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                        </button>
                      )}
                      <span className={styles.readCheck} title={isRead ? 'Read by recipient' : 'Sent'}>
                        <svg width="14" height="10" viewBox="0 0 20 12" fill="none">
                          <path d="M1 6L6 11L13 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 6L12 11L19 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </>
                  )}
                </div>
              </div>
            )
          ) : isMedia ? (
            message.deleted ? (
              <div className={`${styles.bubble} ${isOwn ? styles.bubbleOwn : styles.bubbleOther}`}>
                <span className={styles.deleted}>This message was deleted</span>
              </div>
            ) : (
              <div className={`${styles.mediaBubble} ${isOwn ? styles.mediaBubbleOwn : styles.mediaBubbleOther}`} onClick={() => setLightbox({ url: message.mediaUrl, type: message.mediaType })}>
                {message.type === 'image' ? (
                  <div className={styles.imageWrap}>
                    <img src={message.mediaUrl} alt="Image" className={styles.mediaImg} loading="lazy" style={{ aspectRatio: message.mediaWidth && message.mediaHeight ? `${message.mediaWidth}/${message.mediaHeight}` : '16/9' }} />
                    <div className={styles.mediaOverlay}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </div>
                  </div>
                ) : (
                  <div className={styles.videoWrap}>
                    <video src={message.mediaUrl} className={styles.mediaVideo} preload="metadata" style={{ aspectRatio: message.mediaWidth && message.mediaHeight ? `${message.mediaWidth}/${message.mediaHeight}` : '16/9' }} />
                    <div className={styles.videoPlay}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      {message.mediaDuration && <span className={styles.videoDuration}>{formatDuration(message.mediaDuration)}</span>}
                    </div>
                  </div>
                )}
                {message.content && <p className={styles.mediaCaption}>{message.content}</p>}
                <div className={styles.metaMedia}>
                  <span className={styles.time}>{formatTime(message.createdAt)}</span>
                  {!message.deleted && (
                    <button
                      type="button"
                      className={styles.shareBtn}
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowShareMenu(prev => !prev)
                      }}
                      title="Share this message"
                      aria-label="Share this message"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"/>
                      </svg>
                    </button>
                  )}
                  {isOwn && (
                    <>
                      {canDelete && (
                        <button type="button" className={styles.deleteBtn} onClick={() => onDelete?.(message._id)} title="Delete message" disabled={message.deleted}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                        </button>
                      )}
                      <span className={styles.readCheck} title={isRead ? 'Read by recipient' : 'Sent'}>
                        <svg width="14" height="10" viewBox="0 0 20 12" fill="none">
                          <path d="M1 6L6 11L13 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 6L12 11L19 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </>
                  )}
                </div>
              </div>
            )
          ) : (
            <div className={`${styles.bubble} ${isOwn ? styles.bubbleOwn : styles.bubbleOther}`}>
              {message.deleted ? (
                <span className={styles.deleted}>This message was deleted</span>
              ) : (
                <span className={styles.content}>{message.content || (message.type === 'audio' ? 'Voice message' : '')}</span>
              )}
              <div className={styles.meta}>
                <span className={styles.time}>{formatTime(message.createdAt)}</span>
                {!message.deleted && (
                  <button
                    type="button"
                    className={styles.shareBtn}
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowShareMenu(prev => !prev)
                    }}
                    title="Share this message"
                    aria-label="Share this message"
                  >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"/>
                  </svg>
                  </button>
                )}
                {isOwn && (
                  <>
                    {canDelete && (
                      <button type="button" className={styles.deleteBtn} onClick={() => onDelete?.(message._id)} title="Delete message" disabled={message.deleted}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                      </button>
                    )}
                    <span className={styles.readCheck} title={isRead ? 'Read by recipient' : 'Sent'}>
                      <svg width="14" height="10" viewBox="0 0 20 12" fill="none">
                        <path d="M1 6L6 11L13 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 6L12 11L19 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
          {showShareMenu && (
            <div className={styles.shareMenuWrap}>
              <ShareMessageMenu
                message={message}
                isOwn={isOwn}
                onClose={() => setShowShareMenu(false)}
              />
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <MediaLightbox media={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
