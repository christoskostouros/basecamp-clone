// Instructions: Create a simple API endpoint for database seeding that just creates an organization first to test

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, organizations, organizationMembers, projects, projectMembers, tasks, comments, notifications } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Simple authorization check
    if (body.authorization !== 'seed-db-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Clear existing data (optional)
    console.log('Starting database seed...')

    // Seed Organizations first
    const sampleOrg = {
      id: 'org_sample_1',
      name: 'TechCompany Ελλάδας',
      slug: 'techcompany-elladas',
      publicMetadata: '{}',
      privateMetadata: '{}'
    }

    await db.insert(organizations).values(sampleOrg).onConflictDoNothing()
    console.log('Organization seeded')

    // For now, just return success to test the endpoint
    return NextResponse.json({
      success: true,
      message: 'Database seeding started - organization created!'
    })

  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({
      error: 'Failed to seed database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST method to seed database' })
}
