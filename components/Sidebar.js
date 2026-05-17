'use client'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import ConversationList from './ConversationList'
import NewConversationModal from './NewConversationModal'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const { data: session } = useSession()
  const [showModal, setShowModal] = useState(false)

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

          <button
            className={styles.newBtn}
            onClick={() => setShowModal(true)}
            title="New conversation"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        {/* Conversations */}
        <ConversationList />

        {/* User profile footer */}
        <div className={styles.footer}>
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

      {showModal && (
        <NewConversationModal onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
