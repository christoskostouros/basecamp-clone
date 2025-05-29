import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getUserOrganizations } from '@/lib/queries'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const organizations = await getUserOrganizations(userId)
    return NextResponse.json(organizations)
  } catch (error) {
    console.error('Error fetching organizations:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}