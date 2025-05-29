import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { DashboardFileUpload } from '@/components/DashboardClient'
import { currentUser } from '@clerk/nextjs/server'
import { getDashboardStats, getUserOrganizations, getProjectsByOrganization } from '@/lib/queries'
import { Badge } from '@/components/ui/badge'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Μη εξουσιοδοτημένη πρόσβαση</h2>
          <p className="text-gray-600">Παρακαλώ συνδεθείτε για να δείτε το dashboard σας.</p>
          <Link href="/sign-in" className="mt-4 inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded">
            Σύνδεση
          </Link>
        </div>
      </div>
    )
  }

  // Get user organizations
  let userOrganizations: Awaited<ReturnType<typeof getUserOrganizations>> = []
  let dashboardStats = { activeProjects: 0, pendingTasks: 0, completedTasks: 0, teamMembers: 0 }
  let recentProjects: Awaited<ReturnType<typeof getProjectsByOrganization>> = []

  try {
    userOrganizations = await getUserOrganizations(user.id)

    if (userOrganizations.length > 0) {
      dashboardStats = await getDashboardStats(user.id)
      // Get projects from first organization (in a real app, you'd handle multiple orgs)
      const orgId = userOrganizations[0].id
      recentProjects = await getProjectsByOrganization(orgId)
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }

  const hasOrganizations = userOrganizations.length > 0
  const hasProjects = recentProjects.length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Καλώς ήρθατε{user?.firstName ? `, ${user.firstName}` : ''} στο Dashboard σας
          </h2>
          <p className="text-gray-600">
            Οργανώστε τα έργα σας, διαχειριστείτε τις εργασίες και συνεργαστείτε με την ομάδα σας.
          </p>
        </div>

        {!hasOrganizations ? (
          /* No Organization State */
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h4m6 0h2m-7 4h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Καλώς ήρθατε στο Basecamp Clone!</h3>
            <p className="text-gray-600 mb-6">Για να ξεκινήσετε, δημιουργήστε την πρώτη σας ομάδα.</p>
            <Link
              href="/create-organization"
              className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Δημιουργία Ομάδας
            </Link>
          </div>
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ενεργά Έργα</CardTitle>
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.activeProjects}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Εκκρεμείς Εργασίες</CardTitle>
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.pendingTasks}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Μέλη Ομάδας</CardTitle>
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.teamMembers}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ολοκληρωμένα</CardTitle>
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.completedTasks}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Projects Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Πρόσφατα Έργα</h3>
                  <Link
                    href="/projects"
                    className="text-sm text-yellow-600 hover:text-yellow-700"
                  >
                    Δείτε όλα
                  </Link>
                </div>

                {!hasProjects ? (
                  <Card className="p-8 text-center">
                    <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Δεν υπάρχουν έργα</h4>
                    <p className="text-gray-600 mb-4">Δημιουργήστε το πρώτο σας έργο για να ξεκινήσετε.</p>
                    <Link
                      href="/projects"
                      className="inline-flex items-center px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium rounded-md"
                    >
                      Δημιουργία Έργου
                    </Link>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {recentProjects.slice(0, 2).map((project) => (
                      <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                            <Badge className={
                              project.status === 'active' ? 'bg-green-100 text-green-800' :
                              project.status === 'on_hold' ? 'bg-yellow-100 text-yellow-800' :
                              project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {project.status === 'active' ? 'Ενεργό' :
                               project.status === 'on_hold' ? 'Σε αναμονή' :
                               project.status === 'completed' ? 'Ολοκληρωμένο' : 'Αρχειοθετημένο'}
                            </Badge>
                          </div>
                          <CardDescription>
                            {project.description || 'Χωρίς περιγραφή'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{project.taskCount || 0} εργασίες</span>
                            <span>{project.memberCount || 0} μέλη</span>
                          </div>
                          <div className="mt-3">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '0%' }} />
                            </div>
                            <p className="text-xs text-gray-600 mt-1">0% ολοκληρωμένο</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* File Upload Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ανέβασμα Αρχείων</h3>
                <DashboardFileUpload />
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Πρόσφατη Δραστηριότητα</CardTitle>
                <CardDescription>
                  Οι τελευταίες ενημερώσεις από τα έργα σας
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Δεν υπάρχει πρόσφατη δραστηριότητα</p>
                  <p className="text-sm">Η δραστηριότητα θα εμφανιστεί όταν αρχίσετε να εργάζεστε σε έργα.</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/projects">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900">Διαχείριση Έργων</h3>
                  <p className="text-sm text-gray-500">Δείτε και διαχειριστείτε όλα τα έργα σας</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/tasks">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900">Εργασίες</h3>
                  <p className="text-sm text-gray-500">Παρακολουθήστε και διαχειριστείτε εργασίες</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/team">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900">Ομάδα</h3>
                  <p className="text-sm text-gray-500">Διαχειριστείτε τα μέλη της ομάδας σας</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
