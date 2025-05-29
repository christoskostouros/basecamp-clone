import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Navigation } from '@/components/navigation'

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Μαρία Παπαδοπούλου",
      email: "maria.p@company.com",
      role: "admin",
      department: "Design",
      avatar: "",
      status: "online",
      tasksCompleted: 24,
      activeProjects: 3,
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Γιάννης Κωστόπουλος",
      email: "giannis.k@company.com",
      role: "member",
      department: "Development",
      avatar: "",
      status: "online",
      tasksCompleted: 31,
      activeProjects: 2,
      joinDate: "2023-03-22"
    },
    {
      id: 3,
      name: "Άννα Νικολάου",
      email: "anna.n@company.com",
      role: "member",
      department: "Marketing",
      avatar: "",
      status: "away",
      tasksCompleted: 18,
      activeProjects: 4,
      joinDate: "2023-06-10"
    },
    {
      id: 4,
      name: "Δημήτρης Αλεξάνδρου",
      email: "dimitris.a@company.com",
      role: "member",
      department: "DevOps",
      avatar: "",
      status: "offline",
      tasksCompleted: 28,
      activeProjects: 1,
      joinDate: "2022-11-05"
    },
    {
      id: 5,
      name: "Σοφία Γεωργίου",
      email: "sofia.g@company.com",
      role: "viewer",
      department: "UX Research",
      avatar: "",
      status: "online",
      tasksCompleted: 15,
      activeProjects: 2,
      joinDate: "2023-08-14"
    }
  ]

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">Διαχειριστής</Badge>
      case 'member':
        return <Badge className="bg-blue-100 text-blue-800">Μέλος</Badge>
      case 'viewer':
        return <Badge className="bg-gray-100 text-gray-800">Παρατηρητής</Badge>
      default:
        return <Badge>Άγνωστος</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <div className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2" /><span className="text-green-700">Σε σύνδεση</span></div>
      case 'away':
        return <div className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" /><span className="text-yellow-700">Απών</span></div>
      case 'offline':
        return <div className="flex items-center"><div className="w-2 h-2 bg-gray-500 rounded-full mr-2" /><span className="text-gray-700">Εκτός σύνδεσης</span></div>
      default:
        return <div className="flex items-center"><div className="w-2 h-2 bg-gray-500 rounded-full mr-2" /><span className="text-gray-700">Άγνωστη</span></div>
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
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
              <h1 className="text-3xl font-bold text-gray-900">Ομάδα</h1>
              <p className="mt-2 text-gray-600">
                Διαχειριστείτε τα μέλη της ομάδας σας και τα δικαιώματά τους
              </p>
            </div>
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Πρόσκληση Μέλους
            </Button>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Σύνολο Μελών</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Σε Σύνδεση</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {teamMembers.filter(m => m.status === 'online').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ενεργά Έργα</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {Array.from(new Set(teamMembers.flatMap(m => Array(m.activeProjects).fill(1)))).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ολοκληρωμένες Εργασίες</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                Όλα τα μέλη ({teamMembers.length})
              </Button>
              <Button variant="ghost" size="sm">
                Διαχειριστές ({teamMembers.filter(m => m.role === 'admin').length})
              </Button>
              <Button variant="ghost" size="sm">
                Σε σύνδεση ({teamMembers.filter(m => m.status === 'online').length})
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </svg>
                Φίλτρα
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Αναζήτηση
              </Button>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-yellow-100 text-yellow-800 font-semibold">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.email}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Role and Department */}
                <div className="flex justify-between items-center mb-4">
                  {getRoleBadge(member.role)}
                  <span className="text-sm text-gray-600">{member.department}</span>
                </div>

                {/* Status */}
                <div className="mb-4 text-sm">
                  {getStatusBadge(member.status)}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{member.tasksCompleted}</div>
                    <div className="text-gray-500">Εργασίες</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{member.activeProjects}</div>
                    <div className="text-gray-500">Έργα</div>
                  </div>
                </div>

                {/* Join Date */}
                <div className="text-xs text-gray-500 mb-4">
                  Μέλος από: {new Date(member.joinDate).toLocaleDateString('el-GR')}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Προφίλ
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Department Overview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Επισκόπηση Τμημάτων</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Design', 'Development', 'Marketing', 'DevOps', 'UX Research'].map((dept) => {
              const deptMembers = teamMembers.filter(m => m.department === dept)
              return (
                <Card key={dept}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{dept}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{deptMembers.length}</div>
                    <div className="text-sm text-gray-600">
                      {deptMembers.filter(m => m.status === 'online').length} σε σύνδεση
                    </div>
                    <div className="mt-3 flex -space-x-2">
                      {deptMembers.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
                          <AvatarFallback className="bg-yellow-100 text-yellow-800 text-xs">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {deptMembers.length > 3 && (
                        <div className="w-8 h-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center text-xs text-gray-600">
                          +{deptMembers.length - 3}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
