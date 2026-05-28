'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import styles from './GroupInfoPanel.module.css'

export default function GroupInfoPanel({ conversation, onClose, onUpdated }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [editName, setEditName] = useState(false)
  const [newName, setNewName] = useState(conversation?.name || '')
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAddSearch, setShowAddSearch] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const avatarInputRef = useRef(null)

  const isAdmin = conversation?.admin?._id === session?.user?.id ||
                  conversation?.admin === session?.user?.id

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    }
  }, [avatarPreview])

  useEffect(() => {
    if (!query || query.length < 2) { setSearchResults([]); return }
    const t = setTimeout(async () => {
      setSearching(true)
      const res = await fetch(`/api/users?search=${encodeURIComponent(query)}`)
      if (res.ok) {
        const users = await res.json()
        // Filter out existing members
        const memberIds = conversation.participants.map(p => p._id)
        setSearchResults(users.filter(u => !memberIds.includes(u._id)))
      }
      setSearching(false)
    }, 300)
    return () => clearTimeout(t)
  }, [query, conversation?.participants])

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  async function callPatch(body) {
    setError('')
    setLoading(true)
    const res = await fetch(`/api/conversations/${conversation._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setLoading(false)
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Something went wrong')
      return null
    }
    const updated = await res.json()
    onUpdated(updated)
    return updated
  }

  async function saveName() {
    if (!newName.trim() || newName.trim() === conversation.name) { setEditName(false); return }
    const updated = await callPatch({ action: 'update_info', name: newName.trim() })
    if (updated) setEditName(false)
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file for the group photo')
      return
    }
    if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
    e.target.value = ''
  }

  async function saveAvatar() {
    if (!avatarFile) return
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('file', avatarFile)
      fd.append('folder', 'textme/group-avatars')
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!uploadRes.ok) throw new Error('Group photo upload failed')
      const uploaded = await uploadRes.json()
      const updated = await callPatch({ action: 'update_info', avatar: uploaded.url })
      if (updated) {
        setAvatarFile(null)
        if (avatarPreview) URL.revokeObjectURL(avatarPreview)
        setAvatarPreview(null)
      }
    } catch (err) {
      setError(err.message || 'Failed to update group photo')
    }
    setLoading(false)
  }

  async function removeAvatar() {
    setLoading(true)
    const updated = await callPatch({ action: 'update_info', avatar: '' })
    if (updated) {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview)
      setAvatarPreview(null)
      setAvatarFile(null)
    }
    setLoading(false)
  }

  async function addMember(user) {
    await callPatch({ action: 'add_member', userId: user._id })
    setQuery('')
    setSearchResults([])
    setShowAddSearch(false)
  }

  async function removeMember(userId) {
    await callPatch({ action: 'remove_member', userId })
  }

  async function transferAdmin(userId) {
    await callPatch({ action: 'transfer_admin', newAdminId: userId })
  }

  async function leaveGroup() {
    await callPatch({ action: 'remove_member', userId: session.user.id })
    onClose()
    router.push('/')
  }

  async function deleteGroup() {
    setLoading(true)
    const res = await fetch(`/api/conversations/${conversation._id}`, { method: 'DELETE' })
    setLoading(false)
    if (res.ok) {
      onClose()
      router.push('/')
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>Group info</h3>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div className={styles.body}>
        {/* Group identity */}
        <div className={styles.groupHero}>
          <div className={styles.groupAvatar}>
            {avatarPreview || (typeof conversation?.avatar === 'string' && /^https?:\/\//.test(conversation.avatar))
              ? <img src={avatarPreview || conversation.avatar} alt={conversation?.name || 'Group'} className={styles.avatarImage} />
              : <span className={styles.avatarInitials}>{getInitials(conversation?.name)}</span>
            }
          </div>
          {isAdmin && (
            <div className={styles.avatarActions}>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <button className={styles.saveBtn} onClick={() => avatarInputRef.current?.click()} disabled={loading}>Change photo</button>
              {avatarFile && <button className={styles.secondaryBtn} onClick={saveAvatar} disabled={loading}>Save photo</button>}
              {conversation?.avatar && !avatarFile && <button className={styles.secondaryBtn} onClick={removeAvatar} disabled={loading}>Remove</button>}
            </div>
          )}
          <div className={styles.groupNameRow}>
            {editName && isAdmin ? (
              <div className={styles.nameEditRow}>
                <input
                  className={styles.nameInput}
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditName(false) }}
                  autoFocus
                />
                <button className={styles.saveBtn} onClick={saveName} disabled={loading}>Save</button>
                <button className={styles.cancelBtn} onClick={() => setEditName(false)}>✕</button>
              </div>
            ) : (
              <div className={styles.nameDisplay}>
                <span className={styles.groupName}>{conversation?.name}</span>
                {isAdmin && (
                  <button className={styles.editNameBtn} onClick={() => setEditName(true)} title="Rename group">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                )}
              </div>
            )}
            <span className={styles.groupMeta}>{conversation?.participants?.length} members</span>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {/* Members section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Members</span>
            {isAdmin && (
              <button className={styles.addMemberBtn} onClick={() => setShowAddSearch(p => !p)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
              </button>
            )}
          </div>

          {/* Add member search */}
          {showAddSearch && isAdmin && (
            <div className={styles.addMemberSearch}>
              <div className={styles.searchWrap}>
                <svg className={styles.searchIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  className={styles.searchInput}
                  placeholder="Search users to add…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
              {searching && <div className={styles.searchStatus}><span className="spinner" style={{width:12,height:12}} /></div>}
              {searchResults.map(u => (
                <button key={u._id} className={styles.searchResult} onClick={() => addMember(u)}>
                  <div className={styles.smallAv}>{getInitials(u.name)}</div>
                  <div className={styles.resultInfo}>
                    <span className={styles.resultName}>{u.name}</span>
                    <span className={styles.resultEmail}>{u.email}</span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
              ))}
            </div>
          )}

          {/* Member list */}
          <div className={styles.memberList}>
            {conversation?.participants?.map(member => {
              const memberId = member._id
              const isThisAdmin = conversation?.admin?._id === memberId || conversation?.admin === memberId
              const isMe = memberId === session?.user?.id

              return (
                <div key={memberId} className={styles.memberRow}>
                  <div className={styles.memberAv}>
                    {member.avatar
                      ? <img src={member.avatar} alt={member.name} />
                      : <span>{getInitials(member.name)}</span>
                    }
                    <span className={`${styles.statusDot} ${styles[member.status || 'offline']}`} />
                  </div>
                  <div className={styles.memberInfo}>
                    <span className={styles.memberName}>
                      {member.name}{isMe && <span className={styles.youBadge}> · you</span>}
                    </span>
                    {isThisAdmin && <span className={styles.adminBadge}>admin</span>}
                  </div>
                  {isAdmin && !isMe && !isThisAdmin && (
                    <div className={styles.memberActions}>
                      <button
                        className={styles.memberActionBtn}
                        title="Make admin"
                        onClick={() => transferAdmin(memberId)}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      </button>
                      <button
                        className={`${styles.memberActionBtn} ${styles.removeBtn}`}
                        title="Remove from group"
                        onClick={() => removeMember(memberId)}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Danger zone */}
        <div className={styles.dangerSection}>
          {!isAdmin && (
            <button className={styles.leaveBtn} onClick={leaveGroup} disabled={loading}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Leave group
            </button>
          )}
          {isAdmin && (
            confirmDelete ? (
              <div className={styles.confirmRow}>
                <span className={styles.confirmText}>Delete group and all messages?</span>
                <button className={styles.confirmYes} onClick={deleteGroup} disabled={loading}>Yes, delete</button>
                <button className={styles.confirmNo} onClick={() => setConfirmDelete(false)}>Cancel</button>
              </div>
            ) : (
              <button className={styles.deleteBtn} onClick={() => setConfirmDelete(true)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                Delete group
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
