'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { getPusherClient } from '@/lib/pusher'
import { formatDistanceToNow } from 'date-fns'
import styles from './ConversationList.module.css'

export default function ConversationList() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchConversations = useCallback(async () => {
    const res = await fetch('/api/conversations')
    if (res.ok) {
      const data = await res.json()
      setConversations(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  // Subscribe to user channel for sidebar updates
  useEffect(() => {
    if (!session?.user?.id) return

    const pusher = getPusherClient()
    const channel = pusher.subscribe(`user-${session.user.id}`)

    channel.bind('conversation-updated', () => {
      fetchConversations()
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(`user-${session.user.id}`)
    }
  }, [session?.user?.id, fetchConversations])

  function getOtherParticipant(conv) {
    return conv.participants?.find(p => p._id !== session?.user?.id) || conv.participants?.[0]
  }

  function getInitials(name = '') {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  function formatTime(date) {
    if (!date) return ''
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: false })
        .replace('about ', '')
        .replace(' minutes', 'm')
        .replace(' minute', 'm')
        .replace(' hours', 'h')
        .replace(' hour', 'h')
        .replace(' days', 'd')
        .replace(' day', 'd')
    } catch {
      return ''
    }
  }

  const filtered = conversations.filter(conv => {
    if (!search) return true
    const other = getOtherParticipant(conv)
    return other?.name?.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className={styles.container}>
      {/* Search */}
      <div className={styles.searchWrap}>
        <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className={styles.search}
          type="text"
          placeholder="Search conversations…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className={styles.clearSearch} onClick={() => setSearch('')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Section label */}
      <div className={styles.sectionLabel}>Messages</div>

      {/* List */}
      <div className={styles.list}>
        {loading ? (
          <div className={styles.loadingState}>
            {[1, 2, 3].map(i => (
              <div key={i} className={styles.skeleton}>
                <div className={styles.skeletonAvatar} />
                <div className={styles.skeletonLines}>
                  <div className={styles.skeletonLine} style={{ width: '60%' }} />
                  <div className={styles.skeletonLine} style={{ width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            {search ? 'No conversations found' : 'No conversations yet'}
          </div>
        ) : (
          filtered.map(conv => {
            const isGroup = conv.type === 'group'
            const other = !isGroup ? getOtherParticipant(conv) : null
            const displayName = isGroup ? conv.name : other?.name
            const displayAvatar = isGroup ? conv.avatar : other?.avatar
            const isActive = pathname === `/conversations/${conv._id}`
            const lastMsg = conv.lastMessage

            return (
              <button
                key={conv._id}
                className={`${styles.item} ${isActive ? styles.active : ''}`}
                onClick={() => router.push(`/conversations/${conv._id}`)}
              >
                <div className={styles.itemAvatar}>
                  {isGroup
                    ? displayAvatar
                      ? <span className={styles.groupEmoji}>{displayAvatar}</span>
                      : <span>{getInitials(displayName)}</span>
                    : displayAvatar
                      ? <img src={displayAvatar} alt={displayName} />
                      : <span>{getInitials(displayName)}</span>
                  }
                  {!isGroup && (
                    <span className={`${styles.statusDot} ${styles[other?.status || 'offline']}`} />
                  )}
                  {isGroup && (
                    <span className={styles.groupBadge}>
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="currentColor"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                    </span>
                  )}
                </div>

                <div className={styles.itemContent}>
                  <div className={styles.itemTop}>
                    <span className={styles.itemName}>{displayName || 'Unknown'}</span>
                    {lastMsg?.createdAt && (
                      <span className={styles.itemTime}>{formatTime(lastMsg.createdAt)}</span>
                    )}
                  </div>
                  <span className={styles.itemPreview}>
                    {lastMsg
                      ? lastMsg.type === 'system'
                        ? lastMsg.content
                        : lastMsg.sender?.name === session?.user?.name
                          ? `You: ${lastMsg.content}`
                          : isGroup
                            ? `${lastMsg.sender?.name?.split(' ')[0]}: ${lastMsg.content}`
                            : lastMsg.content
                      : isGroup ? 'Group created' : 'Start a conversation'
                    }
                  </span>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
