import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ClientPortalPage() {
  // This would come from database based on client access token
  const clientProject = {
    id: 'project_1',
    name: 'Website Redesign',
    description: 'Ανανέωση του εταιρικού website με νέο design και λειτουργίες',
    status: 'active',
    progress: 75,
    clientName: 'Εταιρεία ΑΒΓ',
    startDate: '2024-05-01',
    estimatedCompletion: '2024-07-15',
    budget: '€15,000',
    spent: '€11,250',
    team: [
      { id: 1, name: 'Μαρία Παπαδοπούλου', role: 'Project Manager', avatar: '' },
      { id: 2, name: 'Γιάννης Κωστόπουλος', role: 'Lead Developer', avatar: '' },
      { id: 3, name: 'Σοφία Γεωργίου', role: 'UX Designer', avatar: '' }
    ],
    milestones: [
      {
        id: 1,
        title: 'Design Phase',
        status: 'completed',
        completedAt: '2024-05-30',
        description: 'Σχεδιασμός UI/UX και wireframes'
      },
      {
        id: 2,
        title: 'Development Phase',
        status: 'in_progress',
        progress: 65,
        description: 'Frontend και backend development'
      },
      {
        id: 3,
        title: 'Testing & Launch',
        status: 'upcoming',
        estimatedStart: '2024-06-20',
        description: 'Quality testing και production deployment'
      }
    ],
    recentUpdates: [
      {
        id: 1,
        title: 'Homepage Design Completed',
        message: 'Ολοκληρώθηκε ο σχεδιασμός της αρχικής σελίδας. Παρακαλώ ελέγξτε και δώστε το feedback σας.',
        date: '2024-05-28',
        author: 'Μαρία Παπαδοπούλου',
        attachments: ['homepage-mockup.pdf']
      },
      {
        id: 2,
        title: 'Progress Update - Week 3',
        message: 'Προχωρήσαμε στην υλοποίηση του responsive design. Το project είναι εντός χρονοδιαγράμματος.',
        date: '2024-05-25',
        author: 'Γιάννης Κωστόπουλος',
        attachments: []
      }
    ],
    pendingApprovals: [
      {
        id: 1,
        title: 'Color Scheme Approval',
        description: 'Χρειαζόμαστε την έγκρισή σας για την τελική παλέτα χρωμάτων',
        dueDate: '2024-06-05',
        priority: 'high'
      }
    ]
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Ολοκληρωμένο</Badge>
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">Σε εξέλιξη</Badge>
      case 'upcoming':
        return <Badge className="bg-gray-100 text-gray-800">Επερχόμενο</Badge>
      default:
        return <Badge>Άγνωστο</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Client Header */}
      <header className="bg-white shadow-sm border-b-4 border-yellow-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
              <span className="ml-4 text-sm text-gray-500">για {clientProject.clientName}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Επικοινωνία
              </Button>
              <Button variant="ghost" size="sm">
                Λογαριασμός
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Project Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{clientProject.name}</CardTitle>
                  <CardDescription className="mt-2">{clientProject.description}</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800">Ενεργό</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Πρόοδος</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-semibold">{clientProject.progress}%</span>
                    </div>
                    <Progress value={clientProject.progress} className="h-3" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ημερομηνία Έναρξης</p>
                  <p className="mt-1 text-lg font-semibold">{new Date(clientProject.startDate).toLocaleDateString('el-GR')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Εκτιμώμενη Ολοκλήρωση</p>
                  <p className="mt-1 text-lg font-semibold">{new Date(clientProject.estimatedCompletion).toLocaleDateString('el-GR')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Προϋπολογισμός</p>
                  <p className="mt-1 text-lg font-semibold">{clientProject.spent} / {clientProject.budget}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Pending Approvals */}
            {clientProject.pendingApprovals.length > 0 && (
              <Card className="border-l-4 border-l-orange-400">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Εκκρεμείς Εγκρίσεις
                  </CardTitle>
                  <CardDescription>
                    Στοιχεία που χρειάζονται την έγκρισή σας
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clientProject.pendingApprovals.map((approval) => (
                      <div key={approval.id} className="bg-orange-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{approval.title}</h4>
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            {approval.priority === 'high' ? 'Υψηλή Προτεραιότητα' : 'Κανονική'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{approval.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            Προθεσμία: {new Date(approval.dueDate).toLocaleDateString('el-GR')}
                          </span>
                          <div className="space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Έγκριση
                            </Button>
                            <Button size="sm" variant="outline">
                              Σχόλια
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Φάσεις Έργου</CardTitle>
                <CardDescription>
                  Παρακολουθήστε την πρόοδο του έργου σας
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clientProject.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="relative">
                      {index < clientProject.milestones.length - 1 && (
                        <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200" />
                      )}
                      <div className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}>
                          {milestone.status === 'completed' ? (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-white text-sm font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                            {getStatusBadge(milestone.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          {milestone.status === 'completed' && milestone.completedAt && (
                            <p className="text-xs text-green-600">
                              Ολοκληρώθηκε: {new Date(milestone.completedAt).toLocaleDateString('el-GR')}
                            </p>
                          )}
                          {milestone.status === 'in_progress' && milestone.progress && (
                            <div className="mt-2">
                              <Progress value={milestone.progress} className="h-2" />
                              <p className="text-xs text-gray-500 mt-1">{milestone.progress}% ολοκληρωμένο</p>
                            </div>
                          )}
                          {milestone.status === 'upcoming' && milestone.estimatedStart && (
                            <p className="text-xs text-gray-500">
                              Εκτιμώμενη έναρξη: {new Date(milestone.estimatedStart).toLocaleDateString('el-GR')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Πρόσφατες Ενημερώσεις</CardTitle>
                <CardDescription>
                  Τι συμβαίνει στο έργο σας
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clientProject.recentUpdates.map((update) => (
                    <div key={update.id} className="border-l-4 border-l-blue-400 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{update.title}</h4>
                        <span className="text-xs text-gray-500">
                          {new Date(update.date).toLocaleDateString('el-GR')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{update.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">από {update.author}</span>
                        {update.attachments.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span className="text-xs text-blue-600">{update.attachments.length} αρχείο/α</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Team */}
            <Card>
              <CardHeader>
                <CardTitle>Ομάδα Έργου</CardTitle>
                <CardDescription>
                  Τα άτομα που δουλεύουν στο έργο σας
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientProject.team.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-yellow-100 text-yellow-800">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Γρήγορες Ενέργειες</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Στείλε Μήνυμα
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  Κοινοποίηση Αρχείων
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Αναφορά Προόδου
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V7m6 0V7M8 7v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                  </svg>
                  Κλείσιμο Συνάντησης
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Χρειάζεστε Βοήθεια;</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-800 mb-4">
                  Η ομάδα υποστήριξής μας είναι εδώ για να σας βοηθήσει.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Επικοινωνία Υποστήριξης
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
