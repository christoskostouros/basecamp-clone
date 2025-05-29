import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getAllProjectsForUser, createProject } from '@/lib/queries'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const statusFilter = searchParams.get('status')
    const searchTerm = searchParams.get('search')

    // For now, use the simple getAllProjectsForUser
    // In the future, we can implement the filtered version
    const projects = await getAllProjectsForUser(userId)
    
    // Apply client-side filtering for now
    let filteredProjects = projects
    
    if (statusFilter && statusFilter !== 'all') {
      if (statusFilter === 'active') {
        filteredProjects = filteredProjects.filter(p => p.status === 'active' || p.status === 'on_hold')
      } else {
        filteredProjects = filteredProjects.filter(p => p.status === statusFilter)
      }
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filteredProjects = filteredProjects.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        (p.description && p.description.toLowerCase().includes(searchLower))
      )
    }

    return NextResponse.json(filteredProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, organizationId } = body

    if (!name || !organizationId) {
      return NextResponse.json({ error: 'Name and organization ID are required' }, { status: 400 })
    }

    const project = await createProject({
      name,
      description: description || null,
      organizationId,
      createdBy: userId
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}