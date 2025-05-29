import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Seed endpoint is temporarily simplified for deployment stability',
    status: 'ready',
    instructions: {
      note: 'Full seeding functionality will be re-enabled once deployment is stable'
    }
  })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    message: 'Seed endpoint is temporarily simplified for deployment stability',
    status: 'stub',
    instructions: {
      note: 'Full seeding functionality will be re-enabled once deployment is stable'
    }
  })
}
