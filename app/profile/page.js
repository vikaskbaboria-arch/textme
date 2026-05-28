'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import styles from './profile.module.css'

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', bio: '', status: 'offline' })
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [removeAvatar, setRemoveAvatar] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        setProfile(data)
        setForm({ name: data.name || '', bio: data.bio || '', status: data.status || 'offline' })
      }
      setLoading(false)
    }
    load()
  }, [])

  function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return }
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
    setRemoveAvatar(false)
    e.target.value = ''
  }

  async function handleSave() {
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      let avatarUrl = removeAvatar ? null : profile?.avatar

      // Upload new avatar if selected
      if (avatarFile) {
        setUploading(true)
        const fd = new FormData()
        fd.append('file', avatarFile)
        fd.append('folder', 'textme/avatars')
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: fd })
        if (!uploadRes.ok) throw new Error('Avatar upload failed')
        const uploaded = await uploadRes.json()
        avatarUrl = uploaded.url
        setUploading(false)
      }

      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, bio: form.bio, avatar: avatarUrl, status: form.status }),
      })

      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Failed to save')
      }

      const updated = await res.json()
      setProfile(updated)
      setAvatarFile(null)
      setRemoveAvatar(false)
      if (avatarPreview) { URL.revokeObjectURL(avatarPreview); setAvatarPreview(null) }

      // Update NextAuth session
      await updateSession({ name: updated.name, avatar: updated.avatar, bio: updated.bio, status: updated.status })

      setSuccess('Profile updated!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    }
    setSaving(false)
    setUploading(false)
  }

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  const displayAvatar = avatarPreview || profile?.avatar
  const hasChanges = form.name !== profile?.name || form.bio !== (profile?.bio || '') || form.status !== (profile?.status || 'offline') || avatarFile || removeAvatar

  if (loading) return (
    <div className={styles.loadingPage}>
      <span className="spinner" style={{ width: 24, height: 24 }} />
    </div>
  )

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Back */}
        <button className={styles.backBtn} onClick={() => router.push('/')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to chats
        </button>

        <div className={styles.card}>
          {/* Header */}
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Your profile</h1>
            <p className={styles.cardSub}>Manage how you appear to others</p>
          </div>

          {/* Avatar section */}
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrap}>
              {displayAvatar ? (
                <img src={displayAvatar} alt={profile?.name} className={styles.avatar} />
              ) : (
                <span className={styles.avatarInitials}>{getInitials(form.name || profile?.name)}</span>
              )}
              {uploading && (
                <div className={styles.avatarUploading}>
                  <span className="spinner" style={{ width: 18, height: 18 }} />
                </div>
              )}
            </div>

            <div className={styles.avatarInfo}>
              <p className={styles.avatarName}>{form.name || profile?.name}</p>
              <p className={styles.avatarEmail}>{profile?.email}</p>
              <div className={styles.avatarActions}>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
                <button className={styles.uploadBtn} onClick={() => fileRef.current?.click()}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  {displayAvatar ? 'Change photo' : 'Upload photo'}
                </button>
                {displayAvatar && (
                  <button className={styles.removeAvatarBtn} onClick={() => {
                    setAvatarFile(null)
                    setAvatarPreview(null)
                    setRemoveAvatar(true)
                  }}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Form */}
          <div className={styles.form}>
            {error && <div className={styles.errorBanner}>{error}</div>}
            {success && <div className={styles.successBanner}>✓ {success}</div>}

            <div className={styles.field}>
              <label className={styles.label}>Display name</label>
              <input
                className={styles.input}
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
                maxLength={50}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={`${styles.input} ${styles.inputDisabled}`}
                type="email"
                value={profile?.email || ''}
                disabled
              />
              <p className={styles.fieldNote}>Email cannot be changed</p>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <select
                className={styles.input}
                value={form.status}
                onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
              >
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Bio</label>
              <textarea
                className={styles.textarea}
                value={form.bio}
                onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                placeholder="Tell people a little about yourself…"
                maxLength={160}
                rows={3}
              />
              <p className={styles.charCount}>{form.bio.length}/160</p>
            </div>

            <div className={styles.formActions}>
              <button
                className={styles.saveBtn}
                onClick={handleSave}
                disabled={saving || !hasChanges}
              >
                {saving
                  ? <><span className="spinner" style={{width:14,height:14,borderTopColor:'#0a1a18'}} /> Saving…</>
                  : 'Save changes'
                }
              </button>
              <button className={styles.cancelBtn} onClick={() => router.push('/')}>
                Cancel
              </button>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statVal}>{new Date(profile?.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              <span className={styles.statLabel}>Member since</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statVal}>{profile?.status || 'offline'}</span>
              <span className={styles.statLabel}>Status</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
