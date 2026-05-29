import './globals.css'
import AuthProvider from '@/components/AuthProvider'

export const metadata = {
  title: '',
  description: 'Real-time messaging for everyone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
