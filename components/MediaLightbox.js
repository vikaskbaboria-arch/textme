'use client'
import { useEffect, useCallback } from 'react'
import styles from './MediaLightbox.module.css'

export default function MediaLightbox({ media, onClose }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!media) return null

  function formatBytes(bytes) {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.toolbar}>
        <span className={styles.toolbarName}>{media.type === 'video' ? 'Video' : 'Image'}</span>
        <div className={styles.toolbarActions}>
          <a
            href={media.url}
            download
            target="_blank"
            rel="noreferrer"
            className={styles.toolbarBtn}
            title="Download"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </a>
          <a
            href={media.url}
            target="_blank"
            rel="noreferrer"
            className={styles.toolbarBtn}
            title="Open in new tab"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
          <button className={styles.toolbarBtn} onClick={onClose} title="Close (Esc)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {media.type === 'video' ? (
          <video
            className={styles.video}
            src={media.url}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <img
            className={styles.image}
            src={media.url}
            alt="Media"
            onClick={e => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  )
}
