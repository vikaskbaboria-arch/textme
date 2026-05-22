'use client'
import { useState, useRef, useEffect } from 'react'
import styles from './ShareMessageMenu.module.css'

export default function ShareMessageMenu({ message, isOwn, onClose }) {
  const [step, setStep] = useState('idle') // idle | loading | ready | copied | error
  const [shareUrl, setShareUrl] = useState('')
  const [emailTo, setEmailTo] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(false)
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    setTimeout(() => document.addEventListener('mousedown', handler), 0)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Generate share link on mount
  useEffect(() => {
    async function createLink() {
      setStep('loading')
      try {
        const res = await fetch('/api/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messageId: message._id }),
        })
        if (!res.ok) throw new Error()
        const { token } = await res.json()
        const url = `${window.location.origin}/shared/${token}`
        setShareUrl(url)
        setStep('ready')
      } catch {
        setStep('error')
      }
    }
    createLink()
  }, [message._id])

  // ── Actions ─────────────────────────────────────────────────
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setStep('copied')
      setTimeout(() => setStep('ready'), 2000)
    } catch {
      // Fallback: select text
      const el = document.createElement('textarea')
      el.value = shareUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setStep('copied')
      setTimeout(() => setStep('ready'), 2000)
    }
  }

  function openEmail() {
    const subject = encodeURIComponent(`Message from textMe`)
    const body = encodeURIComponent(buildEmailBody())
    const to = encodeURIComponent(emailTo)
    window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_blank')
    onClose()
  }

  function buildEmailBody() {
    const lines = []
    lines.push(`${message.sender?.name || 'Someone'} shared a message with you on textMe:`)
    lines.push('')
    if (message.content) lines.push(`"${message.content}"`)
    if (message.mediaUrl) lines.push(`Media: ${message.mediaUrl}`)
    lines.push('')
    lines.push(`View the full message: ${shareUrl}`)
    lines.push('')
    lines.push('— Sent via textMe')
    return lines.join('\n')
  }

  async function nativeShare() {
    if (!navigator.share) return
    try {
      const shareData = {
        title: `Message from ${message.sender?.name || 'Someone'} on textMe`,
        text: message.content || (message.type === 'image' ? '📷 Image' : '🎥 Video'),
        url: shareUrl,
      }
      await navigator.share(shareData)
      onClose()
    } catch (err) {
      if (err.name !== 'AbortError') console.error(err)
    }
  }

  const supportsNativeShare = typeof navigator !== 'undefined' && !!navigator.share
  const isMedia = message.type === 'image' || message.type === 'video'
  const preview = message.content || (message.type === 'image' ? '📷 Image' : message.type === 'video' ? '🎥 Video' : '')

  return (
    <div className={`${styles.menu} ${isOwn ? styles.menuOwn : ''}`} ref={ref}>
      {/* Message preview */}
      <div className={styles.preview}>
        {isMedia && message.mediaUrl && (
          <div className={styles.previewThumb}>
            {message.type === 'image'
              ? <img src={message.mediaUrl} alt="" />
              : <video src={message.mediaUrl} />
            }
          </div>
        )}
        <p className={styles.previewText}>{preview || 'Message'}</p>
      </div>

      <div className={styles.divider} />

      {/* Link row */}
      <div className={styles.linkRow}>
        <div className={styles.linkBox}>
          {step === 'loading' && <span className={styles.linkPlaceholder}>Generating link…</span>}
          {step === 'error' && <span className={styles.linkError}>Failed to generate link</span>}
          {(step === 'ready' || step === 'copied') && (
            <span className={styles.linkText}>{shareUrl}</span>
          )}
        </div>
        <button
          className={`${styles.copyBtn} ${step === 'copied' ? styles.copyBtnDone : ''}`}
          onClick={copyLink}
          disabled={step !== 'ready' && step !== 'copied'}
          title="Copy link"
        >
          {step === 'copied'
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          }
          {step === 'copied' ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div className={styles.divider} />

      {/* Share options */}
      <div className={styles.options}>
        {/* Email */}
        <div className={styles.emailSection}>
          <button
            className={styles.option}
            onClick={() => setShowEmailInput(p => !p)}
          >
            <span className={styles.optionIcon}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className={styles.optionLabel}>Share via Email</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              style={{ transform: showEmailInput ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {showEmailInput && (
            <div className={styles.emailInput}>
              <input
                type="email"
                className={styles.emailField}
                placeholder="recipient@example.com (optional)"
                value={emailTo}
                onChange={e => setEmailTo(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && openEmail()}
                autoFocus
              />
              <button
                className={styles.emailSendBtn}
                onClick={openEmail}
                disabled={step === 'loading'}
              >
                Open mail app
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <p className={styles.emailHint}>
                Opens your default mail app with the message pre-filled
              </p>
            </div>
          )}
        </div>

        {/* WhatsApp */}
        <button
          className={styles.option}
          onClick={() => {
            const text = encodeURIComponent(`${preview ? `"${preview}" — ` : ''}${shareUrl}`)
            window.open(`https://wa.me/?text=${text}`, '_blank')
            onClose()
          }}
          disabled={step === 'loading'}
        >
          <span className={styles.optionIcon} style={{ color: '#25D366' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.103 1.51 5.833L.057 23.175a.75.75 0 00.921.921l5.342-1.453A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.732 9.732 0 01-4.964-1.354l-.357-.212-3.7 1.006 1.006-3.7-.212-.357A9.732 9.732 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
          </span>
          <span className={styles.optionLabel}>Share on WhatsApp</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>

        {/* Telegram */}
        <button
          className={styles.option}
          onClick={() => {
            const text = encodeURIComponent(preview || 'Check this out')
            const url = encodeURIComponent(shareUrl)
            window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank')
            onClose()
          }}
          disabled={step === 'loading'}
        >
          <span className={styles.optionIcon} style={{ color: '#2CA5E0' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.018 9.51c-.148.658-.537.818-1.084.508l-3-2.21-1.448 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.347 14.23l-2.95-.924c-.64-.202-.654-.64.136-.948l11.527-4.445c.533-.194 1.001.13.502.335z"/>
            </svg>
          </span>
          <span className={styles.optionLabel}>Share on Telegram</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>

        {/* Twitter / X */}
        <button
          className={styles.option}
          onClick={() => {
            const text = encodeURIComponent(`${preview ? `"${preview}" ` : ''}${shareUrl}`)
            window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
            onClose()
          }}
          disabled={step === 'loading'}
        >
          <span className={styles.optionIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </span>
          <span className={styles.optionLabel}>Share on X (Twitter)</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>

        {/* Native share — only show if API available */}
        {supportsNativeShare && (
          <button
            className={`${styles.option} ${styles.optionNative}`}
            onClick={nativeShare}
            disabled={step === 'loading'}
          >
            <span className={styles.optionIcon}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </span>
            <span className={styles.optionLabel}>More options…</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        )}
      </div>
    </div>
  )
}
