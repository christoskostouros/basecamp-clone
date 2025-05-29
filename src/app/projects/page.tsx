'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Navigation } from '@/components/navigation'
// Using API route instead of direct database calls
import { CreateProjectDialog } from '@/components/CreateProjectDialog'

interface ProjectData {
  id: string
  name: string
  description: string | null
  status: 'active' | 'on_hold' | 'completed' | 'archived'
  createdAt: Date
  updatedAt: Date
  createdBy: string
  organizationId: string
  memberCount: number
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  progress: number
}

export default function ProjectsPage() {
  const { user, isLoaded } = useUser()
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const loadProjects = useCallback(async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/projects')
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }
      
      const projectsData = await response.json()
      setProjects(projectsData)
    } catch (err) {
      console.error('Error loading projects:', err)
      setError('Αποτυχία φόρτωσης έργων')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (isLoaded && user) {
      loadProjects()
    }
  }, [isLoaded, user, loadProjects])

  const filteredProjects = useMemo(() => {
    let filtered = projects

    // Apply status filter
    if (statusFilter === 'active') {
      filtered = filtered.filter(p => p.status === 'active' || p.status === 'on_hold')
    } else if (statusFilter === 'completed') {
      filtered = filtered.filter(p => p.status === 'completed')
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        (p.description && p.description.toLowerCase().includes(searchLower))
      )
    }

    return filtered
  }, [projects, statusFilter, searchTerm])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ενεργό</Badge>
      case 'on_hold':
        return <Badge className="bg-yellow-100 text-yellow-800">Σε αναστολή</Badge>
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Ολοκληρωμένο</Badge>
      case 'archived':
        return <Badge className="bg-slate-100 text-slate-800">Αρχειοθετημένο</Badge>
      default:
        return <Badge>Άγνωστο</Badge>
    }
  }

  const getActiveCount = () => projects.filter(p => p.status === 'active' || p.status === 'on_hold').length
  const getCompletedCount = () => projects.filter(p => p.status === 'completed').length

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
              <p className="mt-2 text-gray-600">Φόρτωση έργων...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Απαιτείται σύνδεση</h3>
            <p className="mt-1 text-sm text-gray-500">Παρακαλώ συνδεθείτε για να δείτε τα έργα σας.</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.862-.833-2.632 0L4.182 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Σφάλμα φόρτωσης</h3>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
            <div className="mt-4">
              <Button onClick={loadProjects} variant="outline">
                Προσπάθεια ξανά
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Έργα</h1>
              <p className="mt-2 text-gray-600">
                Διαχειριστείτε και παρακολουθείστε όλα τα έργα σας
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={() => setShowCreateDialog(true)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Δημιουργία Έργου
            </Button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="max-w-md">
            <Input
              placeholder="Αναζήτηση έργων..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Button 
                variant={statusFilter === 'all' ? 'outline' : 'ghost'} 
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Όλα ({projects.length})
              </Button>
              <Button 
                variant={statusFilter === 'active' ? 'outline' : 'ghost'} 
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Ενεργά ({getActiveCount()})
              </Button>
              <Button 
                variant={statusFilter === 'completed' ? 'outline' : 'ghost'} 
                size="sm"
                onClick={() => setStatusFilter('completed')}
              >
                Ολοκληρωμένα ({getCompletedCount()})
              </Button>
            </div>
            
            {filteredProjects.length !== projects.length && (
              <div className="text-sm text-gray-500">
                Εμφάνιση {filteredProjects.length} από {projects.length} έργα
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer group h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-yellow-600 transition-colors">
                          {project.name}
                        </CardTitle>
                        <div className="mt-2">
                          {getStatusBadge(project.status)}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </Button>
                    </div>
                    <CardDescription className="mt-2">
                      {project.description || 'Χωρίς περιγραφή'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                        <span>Πρόοδος</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">
                          {project.completedTasks}/{project.totalTasks}
                        </div>
                        <div className="text-gray-500">Εργασίες</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{project.memberCount}</div>
                        <div className="text-gray-500">Μέλη</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">
                          {new Date(project.updatedAt).toLocaleDateString('el-GR')}
                        </div>
                        <div className="text-gray-500">Ενημέρωση</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Προβολή
                      </Button>
                      <Button variant="ghost" size="sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {searchTerm || statusFilter !== 'all' ? 'Δεν βρέθηκαν έργα' : 'Δεν υπάρχουν έργα'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Δοκιμάστε διαφορετικά κριτήρια αναζήτησης ή φίλτρα.'
                : 'Ξεκινήστε δημιουργώντας ένα νέο έργο.'
              }
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <div className="mt-6">
                <Button 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                  onClick={() => setShowCreateDialog(true)}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Δημιουργία Πρώτου Έργου
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Create Project Dialog */}
      <CreateProjectDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        onProjectCreated={loadProjects}
      />
    </div>
  )
}