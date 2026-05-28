'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import styles from './GroupSettings.module.css'

export default function GroupSettings({ conversation, onClose, onUpdated }) {
  const { data: session } = useSession()
  const isAdmin = conversation?.admin?._id === session?.user?.id ||
                  conversation?.admin === session?.user?.id

  const [settings, setSettings] = useState({
    onlyAdminCanMessage: conversation?.settings?.onlyAdminCanMessage ?? false,
    encrypted:           conversation?.settings?.encrypted ?? false,
    disappearingMessages: conversation?.settings?.disappearingMessages ?? false,
    disappearAfterMs:    conversation?.settings?.disappearAfterMs ?? null,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  async function saveSettings() {
    setSaving(true)
    setError('')
    const res = await fetch(`/api/conversations/${conversation._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_settings', settings }),
    })
    if (res.ok) {
      const updated = await res.json()
      onUpdated(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      const d = await res.json()
      setError(d.error || 'Failed to save')
    }
    setSaving(false)
  }

  function toggle(key) {
    if (!isAdmin) return
    setSettings(p => ({ ...p, [key]: !p[key] }))
  }

  const DISAPPEAR_OPTIONS = [
    { label: '1 hour',  value: 60 * 60 * 1000 },
    { label: '24 hours', value: 24 * 60 * 60 * 1000 },
    { label: '7 days',  value: 7 * 24 * 60 * 60 * 1000 },
  ]

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onClose}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h3 className={styles.title}>Group settings</h3>
      </div>

      {!isAdmin && (
        <div className={styles.adminNote}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Only the group admin can change settings
        </div>
      )}

      <div className={styles.body}>
        {error && <div className={styles.error}>{error}</div>}

        {/* Messaging permissions */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Messaging</div>

          <SettingRow
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>}
            label="Only admin can send messages"
            description="Members can still read messages but only the admin can send"
            value={settings.onlyAdminCanMessage}
            onChange={() => toggle('onlyAdminCanMessage')}
            disabled={!isAdmin}
          />
        </div>

        {/* Security */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Security & Privacy</div>

          <SettingRow
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
            label="End-to-end encryption"
            description="Messages are encrypted on your device. The server never sees plaintext."
            value={settings.encrypted}
            onChange={() => toggle('encrypted')}
            disabled={!isAdmin}
            badge="E2E"
          />

          <SettingRow
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            label="Disappearing messages"
            description="Messages are automatically deleted after the set time"
            value={settings.disappearingMessages}
            onChange={() => toggle('disappearingMessages')}
            disabled={!isAdmin}
          />

          {settings.disappearingMessages && (
            <div className={styles.subOption}>
              <span className={styles.subLabel}>Delete after</span>
              <div className={styles.radioGroup}>
                {DISAPPEAR_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`${styles.radioBtn} ${settings.disappearAfterMs === opt.value ? styles.radioBtnActive : ''}`}
                    onClick={() => isAdmin && setSettings(p => ({ ...p, disappearAfterMs: opt.value }))}
                    disabled={!isAdmin}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Group image placeholder - info row */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Group image</div>
          <div className={styles.infoRow}>
            <div className={styles.currentAvatar}>
              {conversation?.avatar
                ? <span className={styles.emojiAvatar}>{conversation.avatar}</span>
                : <span className={styles.initials}>{(conversation?.name || '?').slice(0, 2).toUpperCase()}</span>
              }
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>{conversation?.name}</span>
              <span className={styles.infoSub}>Change group icon in Group Info panel</span>
            </div>
          </div>
        </div>

        {isAdmin && (
          <button
            className={`${styles.saveBtn} ${saved ? styles.saveBtnSaved : ''}`}
            onClick={saveSettings}
            disabled={saving}
          >
            {saving
              ? <><span className="spinner" style={{width:13,height:13,borderTopColor:'#0a1a18'}} /> Saving…</>
              : saved ? '✓ Saved!' : 'Save settings'
            }
          </button>
        )}
      </div>
    </div>
  )
}

function SettingRow({ icon, label, description, value, onChange, disabled, badge }) {
  return (
    <div className={`${styles.settingRow} ${disabled ? styles.settingRowDisabled : ''}`} onClick={onChange}>
      <div className={styles.settingIcon}>{icon}</div>
      <div className={styles.settingInfo}>
        <div className={styles.settingLabel}>
          {label}
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
        <div className={styles.settingDesc}>{description}</div>
      </div>
      <div className={`${styles.toggle} ${value ? styles.toggleOn : ''}`}>
        <div className={styles.toggleThumb} />
      </div>
    </div>
  )
}
