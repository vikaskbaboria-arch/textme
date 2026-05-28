'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './NewConversationModal.module.css'

export default function NewConversationModal({ onClose }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      const res = await fetch(`/api/users?search=${encodeURIComponent(query)}`)
      if (res.ok) setResults(await res.json())
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  async function startConversation(userId) {
    setCreating(true)
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantId: userId }),
    })

    if (res.ok) {
      const conv = await res.json()
      onClose()
      router.push(`/conversations/${conv._id}`)
    }
    setCreating(false)
  }

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>New message</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.searchRow}>
          <span className={styles.toLabel}>To:</span>
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="text"
            placeholder="Search by name or email…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.results}>
          {loading && (
            <div className={styles.statusRow}>
              <span className="spinner" style={{ width: 16, height: 16 }} />
              <span>Searching…</span>
            </div>
          )}
          {!loading && query.length >= 2 && results.length === 0 && (
            <div className={styles.statusRow}>No users found for {query}</div>
          )}
          {results.map(user => (
            <button
              key={user._id}
              className={styles.userRow}
              onClick={() => startConversation(user._id)}
              disabled={creating}
            >
              <div className={styles.userAvatar}>
                {user.avatar
                  ? <img src={user.avatar} alt={user.name} />
                  : <span>{getInitials(user.name)}</span>
                }
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrowIcon}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
