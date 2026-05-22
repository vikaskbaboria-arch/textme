import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/mongoose'
import User from '@/models/User'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()

        const user = await User.findOne({ email: credentials.email }).select('+password')

        if (!user) throw new Error('No account found with this email')

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) throw new Error('Incorrect password')

        await User.findByIdAndUpdate(user._id, {
          status: 'online',
          lastSeen: new Date(),
        })

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.avatar = user.avatar
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.avatar = token.avatar
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
