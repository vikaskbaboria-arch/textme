'use client'
import styles from './MessageBubble.module.css'

export default function MessageBubble({ message, isOwn }) {
  function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  const sender = message.sender

  return (
    <div className={`${styles.row} ${isOwn ? styles.rowOwn : styles.rowOther}`}>
      {!isOwn && (
        <div className={styles.avatar}>
          {sender?.avatar
            ? <img src={sender.avatar} alt={sender.name} />
            : <span>{getInitials(sender?.name || '?')}</span>
          }
        </div>
      )}

      <div className={`${styles.bubble} ${isOwn ? styles.bubbleOwn : styles.bubbleOther}`}>
        {message.deleted ? (
          <span className={styles.deleted}>This message was deleted</span>
        ) : (
          <span className={styles.content}>{message.content}</span>
        )}
        <div className={styles.meta}>
          <span className={styles.time}>{formatTime(message.createdAt)}</span>
          {isOwn && (
            <span className={styles.readCheck}>
              {/* Double check — read */}
              <svg width="14" height="10" viewBox="0 0 20 12" fill="none">
                <path d="M1 6L6 11L13 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 6L12 11L19 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
