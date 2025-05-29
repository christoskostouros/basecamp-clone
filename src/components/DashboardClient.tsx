'use client'

import { CreateTaskDialog } from '@/components/CreateTaskDialog'
import { NotificationBell } from '@/components/NotificationBell'
import { FileUpload } from '@/components/FileUpload'

interface DashboardClientProps {
  children: React.ReactNode
}

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

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
}

export function DashboardClient({ children }: DashboardClientProps) {
  const handleTaskCreated = (task: Task) => {
    console.log('New task created:', task)
    // In real app, this would update the task list
  }

  const handleFileUploaded = (file: UploadedFile) => {
    console.log('File uploaded:', file)
    // In real app, this would update the file list
  }

  return (
    <>
      {children}
      {/* These are available globally within the dashboard */}
      <div className="hidden">
        <CreateTaskDialog onTaskCreated={handleTaskCreated} />
        <NotificationBell />
      </div>
    </>
  )
}

export function DashboardFileUpload() {
  const handleFileUploaded = (file: UploadedFile) => {
    console.log('File uploaded:', file)
    // In real app, this would update the file list
  }

  return <FileUpload onFileUploaded={handleFileUploaded} />
}