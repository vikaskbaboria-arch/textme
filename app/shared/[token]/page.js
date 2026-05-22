import styles from './shared.module.css'

async function getSharedMessage(token) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/share?token=${token}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const msg = await getSharedMessage(params.token)
  if (!msg) return { title: 'Message not found — textMe' }
  const desc = msg.content
    ? msg.content.slice(0, 120)
    : msg.type === 'image' ? 'Shared an image' : 'Shared a video'
  return {
    title: `${msg.senderName} on textMe`,
    description: desc,
    openGraph: {
      title: `${msg.senderName} on textMe`,
      description: desc,
      ...(msg.mediaUrl && msg.type === 'image' && { images: [{ url: msg.mediaUrl }] }),
    },
  }
}

export default async function SharedMessagePage({ params }) {
  const msg = await getSharedMessage(params.token)

  if (!msg) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.notFound}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.notFoundIcon}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h2 className={styles.notFoundTitle}>Link not found</h2>
            <p className={styles.notFoundText}>This shared message may have expired or been removed.</p>
          </div>
        </div>
        <Brand />
      </div>
    )
  }

  function formatDate(d) {
    return new Date(d).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit',
    })
  }

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Sender row */}
        <div className={styles.senderRow}>
          <div className={styles.senderAvatar}>{getInitials(msg.senderName)}</div>
          <div className={styles.senderInfo}>
            <span className={styles.senderName}>{msg.senderName}</span>
            <span className={styles.sentOn}>shared on textMe · {formatDate(msg.createdAt)}</span>
          </div>
        </div>

        {/* Media */}
        {(msg.type === 'image' || msg.type === 'video') && msg.mediaUrl && (
          <div className={styles.mediaWrap}>
            {msg.type === 'image' ? (
              <img src={msg.mediaUrl} alt="Shared image" className={styles.mediaImg} />
            ) : (
              <video src={msg.mediaUrl} controls className={styles.mediaVideo} />
            )}
          </div>
        )}

        {/* Text content */}
        {msg.content && (
          <p className={styles.messageText}>{msg.content}</p>
        )}

        {/* Footer */}
        <div className={styles.cardFooter}>
          <span className={styles.views}>{msg.views} view{msg.views !== 1 ? 's' : ''}</span>
          <div className={styles.footerActions}>
            {/* Download button for media */}
            {msg.mediaUrl && (
              <a
                href={msg.mediaUrl}
                download
                target="_blank"
                rel="noreferrer"
                className={styles.downloadBtn}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download
              </a>
            )}
          </div>
        </div>
      </div>

      <Brand />
    </div>
  )
}

function Brand() {
  return (
    <a href="/" className={styles.brand}>
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="14" fill="rgba(45,212,191,0.12)"/>
        <path d="M12 16C12 13.8 13.8 12 16 12H32C34.2 12 36 13.8 36 16V28C36 30.2 34.2 32 32 32H26L20 36V32H16C13.8 32 12 30.2 12 28V16Z"
          stroke="#2dd4bf" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="19" cy="22" r="1.5" fill="#2dd4bf"/>
        <circle cx="24" cy="22" r="1.5" fill="#2dd4bf"/>
        <circle cx="29" cy="22" r="1.5" fill="#2dd4bf"/>
      </svg>
      <span>Sent via <strong>textMe</strong></span>
    </a>
  )
}
