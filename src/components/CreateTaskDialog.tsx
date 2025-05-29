'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CreateTaskForm } from './CreateTaskForm'
import { Plus } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  status: string
  assigneeId?: string
  projectId?: string
  createdAt: Date
  updatedAt: Date
}

interface CreateTaskDialogProps {
  onTaskCreated?: (task: Task) => void
  projectId?: string
  trigger?: React.ReactNode
}

// Mock data - in real app, this would come from the database
const mockProjects = [
  { id: 'project_1', name: 'Website Redesign' },
  { id: 'project_2', name: 'Mobile App Development' },
  { id: 'project_3', name: 'Marketing Campaign' }
]

const mockTeamMembers = [
  { id: 'user_1', name: 'Μαρία Παπαδοπούλου' },
  { id: 'user_2', name: 'Γιάννης Κωστόπουλος' },
  { id: 'user_3', name: 'Άννα Νικολάου' },
  { id: 'user_4', name: 'Δημήτρης Αλεξάνδρου' },
  { id: 'user_5', name: 'Σοφία Γεωργίου' }
]

export function CreateTaskDialog({ onTaskCreated, projectId, trigger }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (data: {
    title: string
    projectId: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
    description?: string
    assignedTo?: string
    dueDate?: string
  }) => {
    // Simulate API call
    const newTask: Task = {
      id: `task_${Date.now()}`,
      title: data.title,
      description: data.description || '',
      assigneeId: data.assignedTo,
      projectId: data.projectId || projectId || '',
      status: 'todo',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Creating task:', newTask)

    if (onTaskCreated) {
      onTaskCreated(newTask)
    }

    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const defaultTrigger = (
    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
      <Plus className="w-4 h-4 mr-2" />
      Νέα Εργασία
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Δημιουργία Νέας Εργασίας</DialogTitle>
          <DialogDescription>
            Συμπληρώστε τα στοιχεία για τη νέα εργασία που θέλετε να δημιουργήσετε.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <CreateTaskForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            projects={mockProjects}
            teamMembers={mockTeamMembers}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
