import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import ChatWindow from '@/components/ChatWindow'
import styles from '../../page.module.css'

export default async function ConversationPage({ params }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className={styles.appShell}>
      <Sidebar />
      <ChatWindow conversationId={params.id} />
    </div>
  )
}
