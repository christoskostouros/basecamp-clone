// Instructions: Create the root layout with ClerkProvider and SocketProvider

import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import ClientBody from './ClientBody'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Basecamp Clone - Project Management',
  description: 'Διαχείριση έργων εμπνευσμένη από το Basecamp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!publishableKey) {
    console.warn('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY')
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey || ''}
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
    >
      <html lang="el">
        <body className={inter.className}>
          <ClientBody>
            {children}
          </ClientBody>
        </body>
      </html>
    </ClerkProvider>
  )
}