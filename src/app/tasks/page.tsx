import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Navigation } from '@/components/navigation'

export default function TasksPage() {
  const tasks = [
    {
      id: 1,
      title: "Σχεδιασμός νέας αρχικής σελίδας",
      description: "Δημιουργία wireframes και mockups για τη νέα homepage",
      status: "todo",
      priority: "high",
      project: "Website Redesign",
      assignee: "Μαρία Παπαδοπούλου",
      dueDate: "2024-06-15",
      tags: ["design", "frontend"]
    },
    {
      id: 2,
      title: "API Integration για mobile app",
      description: "Σύνδεση της mobile εφαρμογής με το backend API",
      status: "in_progress",
      priority: "urgent",
      project: "Mobile App Development",
      assignee: "Γιάννης Κωστόπουλος",
      dueDate: "2024-06-10",
      tags: ["development", "api"]
    },
    {
      id: 3,
      title: "Content creation για καμπάνια",
      description: "Δημιουργία περιεχομένου για social media posts",
      status: "review",
      priority: "medium",
      project: "Marketing Campaign",
      assignee: "Άννα Νικολάου",
      dueDate: "2024-06-20",
      tags: ["content", "marketing"]
    },
    {
      id: 4,
      title: "Database backup configuration",
      description: "Ρύθμιση αυτόματων backups για την παραγωγή",
      status: "completed",
      priority: "high",
      project: "Database Migration",
      assignee: "Δημήτρης Αλεξάνδρου",
      dueDate: "2024-05-30",
      tags: ["devops", "database"]
    },
    {
      id: 5,
      title: "User testing για νέα features",
      description: "Διεξαγωγή user testing sessions",
      status: "todo",
      priority: "medium",
      project: "Website Redesign",
      assignee: "Σοφία Γεωργίου",
      dueDate: "2024-06-25",
      tags: ["testing", "ux"]
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'todo':
        return <Badge variant="secondary">Προς εκτέλεση</Badge>
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">Σε εξέλιξη</Badge>
      case 'review':
        return <Badge className="bg-orange-100 text-orange-800">Έλεγχος</Badge>
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Ολοκληρωμένη</Badge>
      default:
        return <Badge>Άγνωστο</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="text-gray-600">Χαμηλή</Badge>
      case 'medium':
        return <Badge variant="outline" className="text-yellow-600">Μέτρια</Badge>
      case 'high':
        return <Badge variant="outline" className="text-orange-600">Υψηλή</Badge>
      case 'urgent':
        return <Badge variant="outline" className="text-red-600">Επείγουσα</Badge>
      default:
        return <Badge variant="outline">Άγνωστη</Badge>
    }
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
              <h1 className="text-3xl font-bold text-gray-900">Εργασίες</h1>
              <p className="mt-2 text-gray-600">
                Διαχειριστείτε και παρακολουθείστε όλες τις εργασίες σας
              </p>
            </div>
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Νέα Εργασία
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                Όλες ({tasks.length})
              </Button>
              <Button variant="ghost" size="sm">
                Οι δικές μου ({tasks.filter(t => t.assignee.includes('Μαρία') || t.assignee.includes('Γιάννης')).length})
              </Button>
              <Button variant="ghost" size="sm">
                Σε εξέλιξη ({tasks.filter(t => t.status === 'in_progress').length})
              </Button>
              <Button variant="ghost" size="sm">
                Επείγουσες ({tasks.filter(t => t.priority === 'urgent').length})
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                Ταξινόμηση
              </Button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <div className="flex-shrink-0 mt-1">
                    <Checkbox
                      checked={task.status === 'completed'}
                      className="w-5 h-5"
                    />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {task.description}
                        </p>

                        {/* Meta Information */}
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {task.assignee}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V7m6 0V7M8 7v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                            </svg>
                            {task.project}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V7m6 0V7M8 7v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                            </svg>
                            {new Date(task.dueDate).toLocaleDateString('el-GR')}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Status and Priority */}
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}

                        {/* Actions */}
                        <Button variant="ghost" size="sm" className="mt-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Σύνολο Εργασιών</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Σε Εξέλιξη</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {tasks.filter(t => t.status === 'in_progress').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ολοκληρωμένες</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {tasks.filter(t => t.status === 'completed').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Επείγουσες</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {tasks.filter(t => t.priority === 'urgent').length}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
