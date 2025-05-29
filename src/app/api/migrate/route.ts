import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Migration endpoint is temporarily simplified for deployment stability',
    status: 'ready',
    instructions: {
      note: 'Full migration functionality will be re-enabled once deployment is stable',
      seed: 'Use /api/seed endpoint for data operations'
    }
  })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    message: 'Migration endpoint is temporarily simplified for deployment stability',
    status: 'stub',
    instructions: {
      note: 'Full migration functionality will be re-enabled once deployment is stable',
      seed: 'Use /api/seed endpoint for data operations'
    }
  })
}