'use client'

import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// Using API routes instead of direct database calls

interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProjectCreated: () => void
}

interface Organization {
  id: string
  name: string
  role: string
  joinedAt: Date
}

export function CreateProjectDialog({ open, onOpenChange, onProjectCreated }: CreateProjectDialogProps) {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    organizationId: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    organizationId: ''
  })

  const loadOrganizations = useCallback(async () => {
    if (!user) return
    
    try {
      const response = await fetch('/api/organizations')
      if (!response.ok) {
        throw new Error('Failed to fetch organizations')
      }
      
      const orgs = await response.json()
      setOrganizations(orgs)
      
      // Auto-select first organization if only one exists
      if (orgs.length === 1) {
        setFormData(prev => ({ ...prev, organizationId: orgs[0].id }))
      }
    } catch (error) {
      console.error('Error loading organizations:', error)
    }
  }, [user])

  useEffect(() => {
    if (open && user) {
      loadOrganizations()
      // Reset form when dialog opens
      setFormData({
        name: '',
        description: '',
        organizationId: ''
      })
      setErrors({
        name: '',
        organizationId: ''
      })
    }
  }, [open, user, loadOrganizations])

  const validateForm = () => {
    const newErrors = {
      name: '',
      organizationId: ''
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Το όνομα του έργου είναι υποχρεωτικό'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες'
    }

    if (!formData.organizationId) {
      newErrors.organizationId = 'Επιλέξτε έναν οργανισμό'
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.organizationId
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user || !validateForm()) return

    try {
      setLoading(true)
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          organizationId: formData.organizationId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      onProjectCreated()
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating project:', error)
      // You could add a toast notification here
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Δημιουργία Νέου Έργου</DialogTitle>
          <DialogDescription>
            Δημιουργήστε ένα νέο έργο για την ομάδα σας. Μπορείτε να προσθέσετε μέλη αργότερα.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Όνομα Έργου *</Label>
            <Input
              id="name"
              placeholder="π.χ. Website Redesign"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Περιγραφή</Label>
            <Textarea
              id="description"
              placeholder="Περιγράψτε το έργο και τους στόχους του..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Οργανισμός *</Label>
            <Select 
              value={formData.organizationId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, organizationId: value }))}
            >
              <SelectTrigger className={errors.organizationId ? 'border-red-500' : ''}>
                <SelectValue placeholder="Επιλέξτε οργανισμό" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.organizationId && (
              <p className="text-sm text-red-500">{errors.organizationId}</p>
            )}
            {organizations.length === 0 && (
              <p className="text-sm text-gray-500">
                Δεν βρέθηκαν οργανισμοί. Δημιουργήστε έναν οργανισμό πρώτα.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Ακύρωση
            </Button>
            <Button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
              disabled={loading || organizations.length === 0}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Δημιουργία...
                </>
              ) : (
                'Δημιουργία Έργου'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}