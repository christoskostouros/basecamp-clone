'use client'

import { io, type Socket } from 'socket.io-client'
import { createContext, useContext, useEffect, useState } from 'react'

interface TaskUpdate {
  id: string
  title?: string
  description?: string
  status?: string
  assigneeId?: string
  [key: string]: unknown
}

interface ProjectUpdate {
  id: string
  name?: string
  description?: string
  status?: string
  [key: string]: unknown
}

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  joinProject: (projectId: string) => void
  leaveProject: (projectId: string) => void
  emitTaskUpdate: (taskId: string, update: TaskUpdate) => void
  emitProjectUpdate: (projectId: string, update: ProjectUpdate) => void
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinProject: () => {},
  leaveProject: () => {},
  emitTaskUpdate: () => {},
  emitProjectUpdate: () => {}
})

export const useSocket = () => useContext(SocketContext)

interface SocketProviderProps {
  children: React.ReactNode
  userId?: string
}

export function SocketProvider({ children, userId }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!userId) return

    // Initialize socket connection
    const newSocket = io(process.env.NODE_ENV === 'production' ? 'wss://same-3z3tp0mivhx-latest.netlify.app' : 'ws://localhost:3001', {
      auth: {
        userId
      },
      transports: ['websocket', 'polling']
    })

    newSocket.on('connect', () => {
      console.log('✅ Connected to WebSocket server')
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket server')
      setIsConnected(false)
    })

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error)
      setIsConnected(false)
    })

    // Listen for real-time events
    newSocket.on('task:updated', (data) => {
      console.log('📋 Task updated:', data)
      // Trigger UI updates
      window.dispatchEvent(new CustomEvent('taskUpdated', { detail: data }))
    })

    newSocket.on('task:created', (data) => {
      console.log('✨ New task created:', data)
      window.dispatchEvent(new CustomEvent('taskCreated', { detail: data }))
    })

    newSocket.on('project:updated', (data) => {
      console.log('📊 Project updated:', data)
      window.dispatchEvent(new CustomEvent('projectUpdated', { detail: data }))
    })

    newSocket.on('comment:added', (data) => {
      console.log('💬 New comment:', data)
      window.dispatchEvent(new CustomEvent('commentAdded', { detail: data }))
    })

    newSocket.on('user:joined', (data) => {
      console.log('👋 User joined:', data)
      window.dispatchEvent(new CustomEvent('userJoined', { detail: data }))
    })

    newSocket.on('user:left', (data) => {
      console.log('👋 User left:', data)
      window.dispatchEvent(new CustomEvent('userLeft', { detail: data }))
    })

    newSocket.on('notification:new', (data) => {
      console.log('🔔 New notification:', data)
      window.dispatchEvent(new CustomEvent('newNotification', { detail: data }))
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
      setSocket(null)
      setIsConnected(false)
    }
  }, [userId])

  const joinProject = (projectId: string) => {
    if (socket && isConnected) {
      socket.emit('project:join', { projectId })
      console.log(`📁 Joined project room: ${projectId}`)
    }
  }

  const leaveProject = (projectId: string) => {
    if (socket && isConnected) {
      socket.emit('project:leave', { projectId })
      console.log(`📁 Left project room: ${projectId}`)
    }
  }

  const emitTaskUpdate = (taskId: string, update: TaskUpdate) => {
    if (socket && isConnected) {
      socket.emit('task:update', { taskId, update, userId })
    }
  }

  const emitProjectUpdate = (projectId: string, update: ProjectUpdate) => {
    if (socket && isConnected) {
      socket.emit('project:update', { projectId, update, userId })
    }
  }

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      joinProject,
      leaveProject,
      emitTaskUpdate,
      emitProjectUpdate
    }}>
      {children}
    </SocketContext.Provider>
  )
}

// Hook for listening to real-time events
export function useRealTimeUpdates() {
  const [tasks, setTasks] = useState<TaskUpdate[]>([])
  const [projects, setProjects] = useState<ProjectUpdate[]>([])
  const [notifications, setNotifications] = useState<unknown[]>([])

  useEffect(() => {
    const handleTaskUpdated = (event: CustomEvent) => {
      const updatedTask = event.detail
      setTasks(prev => prev.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      ))
    }

    const handleTaskCreated = (event: CustomEvent) => {
      const newTask = event.detail
      setTasks(prev => [newTask, ...prev])
    }

    const handleProjectUpdated = (event: CustomEvent) => {
      const updatedProject = event.detail
      setProjects(prev => prev.map(project =>
        project.id === updatedProject.id ? { ...project, ...updatedProject } : project
      ))
    }

    const handleNewNotification = (event: CustomEvent) => {
      const notification = event.detail
      setNotifications(prev => [notification, ...prev])
    }

    window.addEventListener('taskUpdated', handleTaskUpdated as EventListener)
    window.addEventListener('taskCreated', handleTaskCreated as EventListener)
    window.addEventListener('projectUpdated', handleProjectUpdated as EventListener)
    window.addEventListener('newNotification', handleNewNotification as EventListener)

    return () => {
      window.removeEventListener('taskUpdated', handleTaskUpdated as EventListener)
      window.removeEventListener('taskCreated', handleTaskCreated as EventListener)
      window.removeEventListener('projectUpdated', handleProjectUpdated as EventListener)
      window.removeEventListener('newNotification', handleNewNotification as EventListener)
    }
  }, [])

  return {
    tasks,
    projects,
    notifications,
    setTasks,
    setProjects,
    setNotifications
  }
}

// Connection status indicator component
export function ConnectionStatus() {
  const { isConnected } = useSocket()

  if (!isConnected) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 border border-red-300 text-red-800 px-3 py-2 rounded-lg text-sm flex items-center space-x-2">
        <div className="w-2 h-2 bg-red-500 rounded-full" />
        <span>Αποσυνδεδεμένο</span>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-100 border border-green-300 text-green-800 px-3 py-2 rounded-lg text-sm flex items-center space-x-2">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span>Συνδεδεμένο</span>
    </div>
  )
}
