# Basecamp Clone

A modern, full-featured project management application inspired by Basecamp, built with Next.js 15, TypeScript, and real-time collaboration features.

**Latest Update**: Fixed TypeScript compilation errors in migrate API endpoint - deployment successful!

## Features

- 🔐 **Authentication**: Secure user authentication with Clerk
- 👥 **Organizations**: Multi-organization support with role-based access
- 📋 **Project Management**: Create and manage projects with team collaboration
- ✅ **Task Management**: Create, assign, and track tasks with priorities and due dates
- 🔔 **Real-time Notifications**: Live updates using Socket.IO
- 💬 **Team Collaboration**: Real-time messaging and updates
- 📊 **Dashboard**: Comprehensive overview of projects, tasks, and team activity
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS and shadcn/ui

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Clerk
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Real-time**: Socket.IO
- **Runtime**: Bun
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Bun runtime installed
- Node.js 18+ (for compatibility)
- PostgreSQL database (we recommend Neon)
- Clerk account for authentication

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd basecamp-clone
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

# Database
DATABASE_URL=your_neon_database_url

# WebSocket
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

4. Set up the database:
```bash
bun run db:push
bun run seed
```

5. Start the development server:
```bash
bun dev
```

6. Start the Socket.IO server (in a separate terminal):
```bash
bun run server.js
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun db:push` - Push database schema
- `bun seed` - Seed database with sample data
- `bun lint` - Run ESLint
- `bun type-check` - Run TypeScript checks

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── projects/          # Projects management
│   ├── tasks/             # Task management
│   └── team/              # Team collaboration
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utility functions and configurations
│   ├── db.ts             # Database configuration
│   ├── queries.ts        # Database queries
│   └── socket.tsx        # Socket.IO client
└── middleware.ts          # Clerk middleware
```

## Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
3. Add environment variables in Netlify dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server.com
```

## Features Overview

### Authentication & Organizations
- Secure authentication with Clerk
- Organization switching and management
- User profiles and settings

### Project Management
- Create and organize projects
- Assign team members to projects
- Track project progress and deadlines

### Task Management
- Create tasks with descriptions, priorities, and due dates
- Assign tasks to team members
- Real-time task updates and notifications

### Real-time Collaboration
- Live notifications for project updates
- Real-time task status changes
- Team activity feeds

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or create an issue in this repository.
