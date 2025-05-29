import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'API routes are working in deployment!',
    timestamp: new Date().toISOString(),
    deployment: 'vercel'
  })
}

export async function POST() {
  return NextResponse.json({
    status: 'success',
    message: 'POST endpoint working!',
    timestamp: new Date().toISOString()
  })
}