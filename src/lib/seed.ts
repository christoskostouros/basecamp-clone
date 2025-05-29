import { db } from './db'
import { users, organizations, organizationMembers, projects, projectMembers, tasks } from './db'

export async function seedDatabase() {
  console.log('Starting database seeding...')

  try {
    const sampleUsers = [
      {
        id: 'user_1',
        email: 'maria.p@company.com',
        firstName: 'Μαρία',
        lastName: 'Παπαδοπούλου',
        username: 'maria_p',
        role: 'admin' as const
      },
      {
        id: 'user_2',
        email: 'giannis.k@company.com',
        firstName: 'Γιάννης',
        lastName: 'Κωστόπουλος',
        username: 'giannis_k',
        role: 'member' as const
      }
    ]

    await db.insert(users).values(sampleUsers).onConflictDoNothing()

    const sampleOrg = {
      id: 'org_1',
      name: 'Εταιρεία Τεχνολογίας',
      description: 'Καινοτόμος εταιρεία'
    }

    await db.insert(organizations).values(sampleOrg).onConflictDoNothing()

    console.log('Database seeded!')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}
