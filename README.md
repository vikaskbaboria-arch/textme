# textMe

A real-time chat application built with Next.js, React, Pusher, and MongoDB.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React, CSS Modules
- **Backend**: Next.js API Routes
- **Real-time**: Pusher
- **Database**: MongoDB + Mongoose
- **Auth**: NextAuth.js (credentials provider)
- **Password Hashing**: bcryptjs

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file:
```env
MONGODB_URI=mongodb://localhost:27017/textme
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

PUSHER_APP_ID=your-pusher-app-id
PUSHER_KEY=your-pusher-key
PUSHER_SECRET=your-pusher-secret
PUSHER_CLUSTER=your-pusher-cluster

NEXT_PUBLIC_PUSHER_KEY=your-pusher-key
NEXT_PUBLIC_PUSHER_CLUSTER=your-pusher-cluster
```

### 3. Run
```bash
npm run dev
```

## Project Structure
```
textme/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js   # Auth endpoints
│   │   ├── conversations/route.js         # CRUD conversations
│   │   ├── messages/route.js              # CRUD messages
│   │   ├── pusher/auth/route.js           # Pusher auth
│   │   └── users/route.js                 # User search
│   ├── (auth)/
│   │   ├── login/page.js
│   │   └── register/page.js
│   ├── conversations/
│   │   └── [id]/page.js
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── Sidebar.js
│   ├── ConversationList.js
│   ├── ChatWindow.js
│   ├── MessageBubble.js
│   ├── NewConversationModal.js
│   └── AuthProvider.js
├── lib/
│   ├── mongoose.js
│   └── pusher.js
├── models/
│   ├── User.js
│   ├── Message.js
│   └── Conversation.js
└── middleware.js
```
