'use client'
import { useState } from 'react'
import MediaLightbox from './MediaLightbox'
import ShareMessageMenu from './ShareMessageMenu'
import styles from './MessageBubble.module.css'

export default function MessageBubble({ message, isOwn, showSender, isSystemMsg }) {
  const [lightbox, setLightbox] = useState(null)
  const [showShare, setShowShare] = useState(false)

  function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true,
    })
  }

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  function formatDuration(s) {
    if (!s) return ''
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  // System messages — no interaction
  if (isSystemMsg) {
    return (
      <div className={styles.systemMsg}>
        <span>{message.content}</span>
      </div>
    )
  }

  const sender = message.sender
  const isMedia = message.type === 'image' || message.type === 'video'
  const canShare = !message.deleted && (message.content || message.mediaUrl)

  return (
    <>
      <div className={`${styles.row} ${isOwn ? styles.rowOwn : styles.rowOther}`}>
        {/* Avatar — other side only */}
        {!isOwn && (
          <div className={styles.avatar}>
            {sender?.avatar
              ? <img src={sender.avatar} alt={sender.name} />
              : <span>{getInitials(sender?.name || '?')}</span>
            }
          </div>
        )}

        <div className={styles.bubbleWrap}>
          {showSender && sender?.name && (
            <span className={styles.senderName}>{sender.name}</span>
          )}

          {/* Hover action row */}
          <div className={styles.bubbleGroup}>
            {/* Share action — appears on hover */}
            {canShare && (
              <div className={`${styles.actions} ${isOwn ? styles.actionsOwn : styles.actionsOther}`}>
                <div className={styles.shareWrap}>
                  <button
                    className={`${styles.actionBtn} ${showShare ? styles.actionBtnActive : ''}`}
                    onClick={() => setShowShare(p => !p)}
                    title="Share message"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </button>
                  {showShare && (
                    <ShareMessageMenu
                      message={message}
                      isOwn={isOwn}
                      onClose={() => setShowShare(false)}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Bubble */}
            {isMedia ? (
              <div
                className={`${styles.mediaBubble} ${isOwn ? styles.mediaBubbleOwn : styles.mediaBubbleOther}`}
                onClick={() => setLightbox({ url: message.mediaUrl, type: message.mediaType })}
              >
                {message.type === 'image' ? (
                  <div className={styles.imageWrap}>
                    <img
                      src={message.mediaUrl}
                      alt="Image"
                      className={styles.mediaImg}
                      loading="lazy"
                      style={{
                        aspectRatio: message.mediaWidth && message.mediaHeight
                          ? `${message.mediaWidth}/${message.mediaHeight}` : '16/9'
                      }}
                    />
                    <div className={styles.mediaOverlay}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className={styles.videoWrap}>
                    <video
                      src={message.mediaUrl}
                      className={styles.mediaVideo}
                      preload="metadata"
                      style={{
                        aspectRatio: message.mediaWidth && message.mediaHeight
                          ? `${message.mediaWidth}/${message.mediaHeight}` : '16/9'
                      }}
                    />
                    <div className={styles.videoPlay}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                      {message.mediaDuration && (
                        <span className={styles.videoDuration}>{formatDuration(message.mediaDuration)}</span>
                      )}
                    </div>
                  </div>
                )}
                {message.content && <p className={styles.mediaCaption}>{message.content}</p>}
                <div className={styles.metaMedia}>
                  <span className={styles.time}>{formatTime(message.createdAt)}</span>
                  {isOwn && (
                    <span className={styles.readCheck}>
                      <svg width="14" height="10" viewBox="0 0 20 12" fill="none">
                        <path d="M1 6L6 11L13 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 6L12 11L19 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className={`${styles.bubble} ${isOwn ? styles.bubbleOwn : styles.bubbleOther}`}>
                {message.deleted
                  ? <span className={styles.deleted}>This message was deleted</span>
                  : <span className={styles.content}>{message.content}</span>
                }
                <div className={styles.meta}>
                  <span className={styles.time}>{formatTime(message.createdAt)}</span>
                  {isOwn && (
                    <span className={styles.readCheck}>
                      <svg width="14" height="10" viewBox="0 0 20 12" fill="none">
                        <path d="M1 6L6 11L13 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 6L12 11L19 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {lightbox && (
        <MediaLightbox media={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
