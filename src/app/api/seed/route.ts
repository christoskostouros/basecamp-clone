import { NextRequest, NextResponse } from 'next/server'
import { seedDatabase } from '@/lib/seed'
import { minimalSeedDatabase } from '@/lib/minimal-seed'

export async function POST(req: NextRequest) {
  try {
    // Simple security check - you might want to add proper authentication
    const { authorization } = await req.json().catch(() => ({}))
    
    if (authorization !== 'seed-db-2024') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🌱 Starting database seeding via API...')
    // Try minimal seeding first to debug the issue
    await minimalSeedDatabase()
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!'
    })
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    
    // More detailed error logging
    let errorDetails = 'Unknown error'
    if (error instanceof Error) {
      errorDetails = error.message
      console.error('Error stack:', error.stack)
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to seed database',
        details: errorDetails,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Database seeding endpoint. Use POST with authorization to seed the database.'
  })
}