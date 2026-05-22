'use client'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ConversationList from './ConversationList'
import NewConversationModal from './NewConversationModal'
import CreateGroupModal from './CreateGroupModal'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const [showDM, setShowDM] = useState(false)
  const [showGroup, setShowGroup] = useState(false)

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  return (
    <>
      <aside className={styles.sidebar}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.brand}>
            <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="14" fill="rgba(45,212,191,0.12)" />
              <path d="M12 16C12 13.8 13.8 12 16 12H32C34.2 12 36 13.8 36 16V28C36 30.2 34.2 32 32 32H26L20 36V32H16C13.8 32 12 30.2 12 28V16Z"
                stroke="#2dd4bf" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="19" cy="22" r="1.5" fill="#2dd4bf" />
              <circle cx="24" cy="22" r="1.5" fill="#2dd4bf" />
              <circle cx="29" cy="22" r="1.5" fill="#2dd4bf" />
            </svg>
            <span className={styles.brandName}>textMe</span>
          </div>

          <div className={styles.headerActions}>
            <div className={styles.newBtnWrap}>
              <button
                className={styles.newBtn}
                onClick={() => setShowMenu(p => !p)}
                title="New"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              {showMenu && (
                <div className={styles.newMenu}>
                  <button className={styles.newMenuItem} onClick={() => { setShowDM(true); setShowMenu(false) }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    New message
                  </button>
                  <button className={styles.newMenuItem} onClick={() => { setShowGroup(true); setShowMenu(false) }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                    New group
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conversations */}
        <ConversationList />

        {/* User profile footer */}
        <div className={styles.footer}>
          <button className={styles.footerProfile} onClick={() => router.push('/profile')} title="Edit profile">
            <div className={styles.avatar}>
              {session?.user?.avatar
                ? <img src={session.user.avatar} alt={session.user.name} />
                : <span>{getInitials(session?.user?.name)}</span>
              }
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{session?.user?.name}</span>
              <span className={styles.userEmail}>{session?.user?.email}</span>
            </div>
          </button>
          <button
            className={styles.signOutBtn}
            onClick={() => signOut({ callbackUrl: '/login' })}
            title="Sign out"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </aside>

      {showDM && <NewConversationModal onClose={() => setShowDM(false)} />}
      {showGroup && <CreateGroupModal onClose={() => setShowGroup(false)} />}
    </>
  )
}
