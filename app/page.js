import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import styles from './page.module.css'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className={styles.appShell}>
      <Sidebar />
      <main className={styles.emptyState}>
        <div className={styles.emptyInner}>
          <div className={styles.emptyLogo}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="14" fill="rgba(45,212,191,0.08)" />
              <path d="M12 16C12 13.8 13.8 12 16 12H32C34.2 12 36 13.8 36 16V28C36 30.2 34.2 32 32 32H26L20 36V32H16C13.8 32 12 30.2 12 28V16Z"
                stroke="#2dd4bf" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="19" cy="22" r="1.5" fill="#2dd4bf" />
              <circle cx="24" cy="22" r="1.5" fill="#2dd4bf" />
              <circle cx="29" cy="22" r="1.5" fill="#2dd4bf" />
            </svg>
          </div>
          <h2 className={styles.emptyTitle}>textMe</h2>
          <p className={styles.emptyDesc}>Select a conversation or start a new one</p>
        </div>
      </main>
    </div>
  )
}
