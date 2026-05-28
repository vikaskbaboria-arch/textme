'use client'
import { useEffect } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'

function PresenceTracker() {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user?.id) return

    const setStatus = async (status) => {
      try {
        await fetch('/api/users/status', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        })
      } catch (err) {
        console.error('Status update failed:', err)
      }
    }

    setStatus('online')

    const handleVisibility = () => setStatus(document.hidden ? 'away' : 'online')
    const handleBeforeUnload = () => setStatus('offline')

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      setStatus('offline')
    }
  }, [session?.user?.id])

  return null
}

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <PresenceTracker />
      {children}
    </SessionProvider>
  )
}
