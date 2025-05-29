'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bell, CheckCircle, MessageSquare, Calendar, UserPlus, FileText } from 'lucide-react'

interface Notification {
  id: string
  type: 'task_assigned' | 'task_completed' | 'comment_added' | 'project_update' | 'deadline_reminder' | 'member_added'
  title: string
  message: string
  read: boolean
  createdAt: Date
  projectName?: string
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'task_assigned',
    title: 'Νέα εργασία ανατέθηκε',
    message: 'Σας ανατέθηκε η εργασία "Frontend Development" στο έργο Website Redesign',
    read: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    projectName: 'Website Redesign'
  },
  {
    id: '2',
    type: 'comment_added',
    title: 'Νέο σχόλιο',
    message: 'Η Μαρία πρόσθεσε σχόλιο στην εργασία "API Integration"',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    projectName: 'Mobile App'
  },
  {
    id: '3',
    type: 'task_completed',
    title: 'Εργασία ολοκληρώθηκε',
    message: 'Ο Γιάννης ολοκλήρωσε την εργασία "Database Setup"',
    read: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    projectName: 'Backend Development'
  },
  {
    id: '4',
    type: 'deadline_reminder',
    title: 'Υπενθύμιση προθεσμίας',
    message: 'Η εργασία "Content Creation" έχει προθεσμία σε 2 ημέρες',
    read: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    projectName: 'Marketing Campaign'
  },
  {
    id: '5',
    type: 'member_added',
    title: 'Νέο μέλος στην ομάδα',
    message: 'Η Σοφία προστέθηκε στο έργο "Website Redesign"',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    projectName: 'Website Redesign'
  }
]

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'task_assigned':
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'task_completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'comment_added':
        return <MessageSquare className="w-4 h-4 text-purple-600" />
      case 'deadline_reminder':
        return <Calendar className="w-4 h-4 text-orange-600" />
      case 'member_added':
        return <UserPlus className="w-4 h-4 text-blue-600" />
      case 'project_update':
        return <FileText className="w-4 h-4 text-gray-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'Τώρα'
    if (diffInMinutes < 60) return `${diffInMinutes} λεπτά πριν`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} ώρες πριν`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} ημέρες πριν`
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const clearNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Ειδοποιήσεις</CardTitle>
                <CardDescription>
                  {unreadCount > 0 ? `${unreadCount} νέες ειδοποιήσεις` : 'Καμία νέα ειδοποίηση'}
                </CardDescription>
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-sm"
                >
                  Όλες ως αναγνωσμένες
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Δεν υπάρχουν ειδοποιήσεις</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        if (!notification.read) {
                          markAsRead(notification.id)
                        }
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${
                                !notification.read ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs text-gray-500">
                                  {getTimeAgo(notification.createdAt)}
                                </span>
                                {notification.projectName && (
                                  <>
                                    <span className="text-xs text-gray-400">•</span>
                                    <Badge variant="outline" className="text-xs">
                                      {notification.projectName}
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  clearNotification(notification.id)
                                }}
                                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                              >
                                ×
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t bg-gray-50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-sm"
                  onClick={() => setOpen(false)}
                >
                  Δείτε όλες τις ειδοποιήσεις
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
