import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { authorization } = await req.json().catch(() => ({}))
    
    if (authorization !== 'seed-db-2024') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🧪 Testing database connection...')
    
    // Try to insert a single minimal user
    const testUser = {
      id: 'test_user_' + Date.now(),
      email: `test_${Date.now()}@example.com`
    }
    
    console.log('Inserting test user:', testUser)
    await db.insert(users).values(testUser)
    console.log('✅ Test user inserted successfully!')
    
    return NextResponse.json({
      success: true,
      message: 'Database test passed!',
      testUser
    })
  } catch (error) {
    console.error('❌ Database test failed:', error)
    
    return NextResponse.json(
      { 
        error: 'Database test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}