import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // Mock project data
  const project = {
    id: resolvedParams.id,
    name: "Website Redesign",
    description: "Ανανέωση του εταιρικού website με νέο design και λειτουργίες",
    status: "active",
    progress: 75,
    members: [
      { id: 1, name: "Μαρία Παπαδοπούλου", role: "admin" },
      { id: 2, name: "Γιάννης Κωστόπουλος", role: "member" },
      { id: 3, name: "Σοφία Γεωργίου", role: "member" }
    ],
    tasks: [
      { id: 1, title: "Σχεδιασμός αρχικής σελίδας", status: "completed" },
      { id: 2, title: "Frontend development", status: "in_progress" },
      { id: 3, title: "Content migration", status: "todo" }
    ]
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-2xl font-bold text-gray-900">
                Basecamp Clone
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/projects" className="text-yellow-600 font-medium">
                Έργα
              </Link>
              <Link href="/tasks" className="text-gray-600 hover:text-gray-900">
                Εργασίες
              </Link>
              <Link href="/team" className="text-gray-600 hover:text-gray-900">
                Ομάδα
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/projects" className="hover:text-gray-700">Έργα</Link></li>
            <li><span>/</span></li>
            <li className="text-gray-900 font-medium">{project.name}</li>
          </ol>
        </nav>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
              <p className="text-gray-600 mb-4">{project.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>Πρόοδος</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                Νέα Εργασία
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tasks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Εργασίες ({project.tasks.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.tasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`w-3 h-3 rounded-full ${
                      task.status === 'completed' ? 'bg-green-500' :
                      task.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <span className={`flex-1 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </span>
                    <Badge variant={task.status === 'completed' ? 'secondary' : 'default'}>
                      {task.status === 'completed' ? 'Ολοκληρωμένη' :
                       task.status === 'in_progress' ? 'Σε εξέλιξη' : 'Προς εκτέλεση'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>Ομάδα ({project.members.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-yellow-100 text-yellow-800">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{member.name}</p>
                      <Badge variant={member.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                        {member.role === 'admin' ? 'Διαχειριστής' : 'Μέλος'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Στοιχεία Έργου</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Κατάσταση:</span>
                  <Badge className="bg-green-100 text-green-800">Ενεργό</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Μέλη:</span>
                  <span>{project.members.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Εργασίες:</span>
                  <span>{project.tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Πρόοδος:</span>
                  <span>{project.progress}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Πρόσφατη Δραστηριότητα</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">Εργασία ολοκληρώθηκε</p>
                    <p className="text-xs text-gray-500">πριν από 2 ώρες</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">Νέο μέλος προστέθηκε</p>
                    <p className="text-xs text-gray-500">πριν από 1 ημέρα</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
