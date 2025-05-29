'use client';

import { useUser } from '@clerk/nextjs'
import { SocketProvider } from '@/lib/socket'
import { Navigation } from '@/components/navigation'

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const { user } = useUser()

  return (
    <SocketProvider userId={user?.id}>
      <Navigation />
      {children}
    </SocketProvider>
  );
}
