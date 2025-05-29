'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const taskFormSchema = z.object({
  title: z.string().min(1, 'Ο τίτλος είναι υποχρεωτικός'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  assignedTo: z.string().optional(),
  dueDate: z.string().optional(),
  projectId: z.string().min(1, 'Το έργο είναι υποχρεωτικό')
})

type TaskFormValues = z.infer<typeof taskFormSchema>

interface CreateTaskFormProps {
  onSubmit: (data: TaskFormValues) => void
  onCancel: () => void
  projects: { id: string; name: string }[]
  teamMembers: { id: string; name: string }[]
}

export function CreateTaskForm({ onSubmit, onCancel, projects, teamMembers }: CreateTaskFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      assignedTo: '',
      dueDate: '',
      projectId: ''
    }
  })

  const handleSubmit = async (data: TaskFormValues) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'urgent': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Δημιουργία Νέας Εργασίας</CardTitle>
        <CardDescription>
          Συμπληρώστε τα στοιχεία για τη νέα εργασία
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Τίτλος Εργασίας *</FormLabel>
                  <FormControl>
                    <Input placeholder="π.χ. Σχεδιασμός αρχικής σελίδας" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Περιγραφή</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Προσθέστε λεπτομέρειες για την εργασία..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Selection */}
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Έργο *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Επιλέξτε έργο" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Priority */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Προτεραιότητα</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-gray-100 text-gray-800">Χαμηλή</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-yellow-100 text-yellow-800">Μέτρια</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-orange-100 text-orange-800">Υψηλή</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="urgent">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-red-100 text-red-800">Επείγουσα</Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Assignee */}
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ανάθεση σε</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Επιλέξτε μέλος ομάδας" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Χωρίς ανάθεση</SelectItem>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Προθεσμία</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preview */}
            {form.watch('title') && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-2">Προεπισκόπηση Εργασίας</h4>
                <div className="space-y-2">
                  <h5 className="font-semibold">{form.watch('title')}</h5>
                  {form.watch('description') && (
                    <p className="text-sm text-gray-600">{form.watch('description')}</p>
                  )}
                  <div className="flex items-center space-x-3 text-sm">
                    <Badge className={getPriorityColor(form.watch('priority'))}>
                      {form.watch('priority') === 'low' ? 'Χαμηλή' :
                       form.watch('priority') === 'medium' ? 'Μέτρια' :
                       form.watch('priority') === 'high' ? 'Υψηλή' : 'Επείγουσα'}
                    </Badge>
                    {form.watch('dueDate') && (
                      <span className="text-gray-500">
                        Προθεσμία: {new Date(form.watch('dueDate') || '').toLocaleDateString('el-GR')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6">
              <Button type="button" variant="outline" onClick={onCancel}>
                Ακύρωση
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                {isSubmitting ? 'Δημιουργία...' : 'Δημιουργία Εργασίας'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
