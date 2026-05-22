'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './CreateGroupModal.module.css'

const GROUP_EMOJIS = ['🚀','💬','🎯','🔥','⚡','🌟','🎨','🎵','🏆','🌈','🦄','🍀','🎉','💡','🌙','🐉','🌺','🦋']

export default function CreateGroupModal({ onClose }) {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: info, 2: members
  const [groupName, setGroupName] = useState('')
  const [groupAvatar, setGroupAvatar] = useState('💬')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedMembers, setSelectedMembers] = useState([])
  const [searching, setSearching] = useState(false)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const nameRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => { nameRef.current?.focus() }, [])
  useEffect(() => { if (step === 2) searchRef.current?.focus() }, [step])

  useEffect(() => {
    if (!query || query.length < 2) { setSearchResults([]); return }
    const t = setTimeout(async () => {
      setSearching(true)
      const res = await fetch(`/api/users?search=${encodeURIComponent(query)}`)
      if (res.ok) setSearchResults(await res.json())
      setSearching(false)
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  function toggleMember(user) {
    setSelectedMembers(prev =>
      prev.some(m => m._id === user._id)
        ? prev.filter(m => m._id !== user._id)
        : [...prev, user]
    )
  }

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  async function createGroup() {
    if (!groupName.trim()) { setError('Group name is required'); return }
    if (selectedMembers.length === 0) { setError('Add at least one member'); return }
    setError('')
    setCreating(true)

    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'group',
        name: groupName.trim(),
        avatar: groupAvatar,
        participantIds: selectedMembers.map(m => m._id),
      }),
    })

    if (res.ok) {
      const conv = await res.json()
      onClose()
      router.push(`/conversations/${conv._id}`)
    } else {
      const data = await res.json()
      setError(data.error || 'Failed to create group')
    }
    setCreating(false)
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {step === 2 && (
              <button className={styles.backBtn} onClick={() => setStep(1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
            )}
            <h3 className={styles.title}>
              {step === 1 ? 'New group' : 'Add members'}
            </h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Step indicator */}
        <div className={styles.steps}>
          <div className={`${styles.step} ${step >= 1 ? styles.stepActive : ''}`}>
            <span>1</span><span>Info</span>
          </div>
          <div className={styles.stepLine} />
          <div className={`${styles.step} ${step >= 2 ? styles.stepActive : ''}`}>
            <span>2</span><span>Members</span>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {/* Step 1 — Group info */}
        {step === 1 && (
          <div className={styles.body}>
            {/* Avatar picker */}
            <div className={styles.avatarSection}>
              <button
                className={styles.avatarBtn}
                onClick={() => setShowEmojiPicker(p => !p)}
              >
                <span className={styles.avatarEmoji}>{groupAvatar}</span>
                <span className={styles.avatarEditBadge}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </span>
              </button>
              {showEmojiPicker && (
                <div className={styles.emojiPicker}>
                  {GROUP_EMOJIS.map(e => (
                    <button
                      key={e}
                      className={`${styles.emojiOption} ${groupAvatar === e ? styles.emojiSelected : ''}`}
                      onClick={() => { setGroupAvatar(e); setShowEmojiPicker(false) }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Group name</label>
              <input
                ref={nameRef}
                className={styles.input}
                type="text"
                placeholder="e.g. Design Team"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                maxLength={100}
                onKeyDown={e => e.key === 'Enter' && groupName.trim() && setStep(2)}
              />
            </div>

            <button
              className={styles.nextBtn}
              onClick={() => { if (!groupName.trim()) { setError('Enter a group name'); return }; setError(''); setStep(2) }}
            >
              Next: Add members
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        )}

        {/* Step 2 — Members */}
        {step === 2 && (
          <div className={styles.body}>
            {/* Selected chips */}
            {selectedMembers.length > 0 && (
              <div className={styles.chips}>
                {selectedMembers.map(m => (
                  <span key={m._id} className={styles.chip}>
                    {m.name}
                    <button onClick={() => toggleMember(m)}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Search */}
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                ref={searchRef}
                className={styles.searchInput}
                placeholder="Search people…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>

            <div className={styles.results}>
              {searching && (
                <div className={styles.statusRow}><span className="spinner" style={{width:14,height:14}} /></div>
              )}
              {!searching && query.length >= 2 && searchResults.length === 0 && (
                <div className={styles.statusRow}>No users found</div>
              )}
              {searchResults.map(user => {
                const selected = selectedMembers.some(m => m._id === user._id)
                return (
                  <button
                    key={user._id}
                    className={`${styles.userRow} ${selected ? styles.userRowSelected : ''}`}
                    onClick={() => toggleMember(user)}
                  >
                    <div className={styles.userAv}>
                      {user.avatar ? <img src={user.avatar} alt={user.name} /> : <span>{getInitials(user.name)}</span>}
                    </div>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{user.name}</span>
                      <span className={styles.userEmail}>{user.email}</span>
                    </div>
                    <div className={`${styles.checkbox} ${selected ? styles.checkboxChecked : ''}`}>
                      {selected && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className={styles.footer}>
              <span className={styles.memberCount}>
                {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
              </span>
              <button
                className={styles.createBtn}
                onClick={createGroup}
                disabled={creating || selectedMembers.length === 0}
              >
                {creating ? <span className="spinner" style={{width:14,height:14}} /> : 'Create group'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
