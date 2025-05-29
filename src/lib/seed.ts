import { db } from './db'
import { 
  users, 
  organizations, 
  organizationMembers, 
  projects, 
  projectMembers, 
  tasks,
  comments,
  notifications
} from './db'

export async function seedDatabase() {
  console.log('🌱 Starting database seeding...')

  try {
    // Clear existing data
    console.log('🧹 Clearing existing data...')
    await db.delete(notifications)
    await db.delete(comments)
    await db.delete(tasks)
    await db.delete(projectMembers)
    await db.delete(projects)
    await db.delete(organizationMembers)
    await db.delete(organizations)
    await db.delete(users)

    // Create sample users
    console.log('👥 Creating users...')
    const now = new Date()
    const sampleUsers = [
      {
        id: 'user_maria',
        email: 'maria.papadopoulou@techcompany.gr',
        firstName: 'Μαρία',
        lastName: 'Παπαδοπούλου',
        username: 'maria_p',
        role: 'admin' as const,
        status: 'active',
        profileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b606?w=100&h=100&fit=crop&crop=face',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'user_giannis',
        email: 'giannis.kostopoulos@techcompany.gr',
        firstName: 'Γιάννης',
        lastName: 'Κωστόπουλος',
        username: 'giannis_k',
        role: 'manager' as const,
        status: 'active',
        profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'user_elena',
        email: 'elena.dimitriou@techcompany.gr',
        firstName: 'Έλενα',
        lastName: 'Δημητρίου',
        username: 'elena_d',
        role: 'member' as const,
        status: 'active',
        profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'user_nikos',
        email: 'nikos.stavros@techcompany.gr',
        firstName: 'Νίκος',
        lastName: 'Σταύρος',
        username: 'nikos_s',
        role: 'member' as const,
        status: 'active',
        profileImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'user_sofia',
        email: 'sofia.georgiou@techcompany.gr',
        firstName: 'Σοφία',
        lastName: 'Γεωργίου',
        username: 'sofia_g',
        role: 'member' as const,
        status: 'active',
        profileImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        createdAt: now,
        updatedAt: now
      }
    ]

    try {
      console.log('Attempting to insert users...')
      await db.insert(users).values(sampleUsers)
      console.log('✅ Users inserted successfully!')
    } catch (error) {
      console.error('❌ Error inserting users:', error)
      console.error('Sample user data:', JSON.stringify(sampleUsers[0], null, 2))
      throw new Error(`Failed query: Insert into 'users' - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Create organization
    console.log('🏢 Creating organization...')
    const sampleOrg = {
      id: 'org_techcompany',
      name: 'TechCompany Ελλάδας',
      slug: 'techcompany-gr',
      profileImageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
      maxAllowedMemberships: 100,
      publicMetadata: '{}',
      privateMetadata: '{}',
      createdAt: now,
      updatedAt: now
    }

    try {
      console.log('Attempting to insert organization...')
      await db.insert(organizations).values(sampleOrg)
      console.log('✅ Organization inserted successfully!')
    } catch (error) {
      console.error('❌ Error inserting organization:', error)
      throw new Error(`Failed query: Insert into 'organizations' - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Create organization members
    console.log('👤 Adding organization members...')
    const orgMembers = [
      {
        id: 'orgmem_1',
        organizationId: 'org_techcompany',
        userId: 'user_maria',
        role: 'owner' as const,
        publicMetadata: '{}',
        privateMetadata: '{}',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'orgmem_2',
        organizationId: 'org_techcompany',
        userId: 'user_giannis',
        role: 'admin' as const,
        publicMetadata: '{}',
        privateMetadata: '{}',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'orgmem_3',
        organizationId: 'org_techcompany',
        userId: 'user_elena',
        role: 'member' as const,
        publicMetadata: '{}',
        privateMetadata: '{}',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'orgmem_4',
        organizationId: 'org_techcompany',
        userId: 'user_nikos',
        role: 'member' as const,
        publicMetadata: '{}',
        privateMetadata: '{}',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'orgmem_5',
        organizationId: 'org_techcompany',
        userId: 'user_sofia',
        role: 'member' as const,
        publicMetadata: '{}',
        privateMetadata: '{}',
        createdAt: now,
        updatedAt: now
      }
    ]

    try {
      console.log('Attempting to insert organization members...')
      await db.insert(organizationMembers).values(orgMembers)
      console.log('✅ Organization members inserted successfully!')
    } catch (error) {
      console.error('❌ Error inserting organization members:', error)
      throw new Error(`Failed query: Insert into 'organization_members' - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Create projects
    console.log('📋 Creating projects...')
    const sampleProjects = [
      {
        name: 'Ανάπτυξη E-Shop',
        description: 'Δημιουργία σύγχρονου ηλεκτρονικού καταστήματος με React και Node.js',
        organizationId: 'org_techcompany',
        createdBy: 'user_maria',
        status: 'active' as const,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Mobile App για Εστιατόρια',
        description: 'Εφαρμογή παραγγελιών φαγητού για Android και iOS',
        organizationId: 'org_techcompany',
        createdBy: 'user_giannis',
        status: 'active' as const,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Σύστημα Διαχείρισης Πελατών (CRM)',
        description: 'Ολοκληρωμένο σύστημα για την διαχείριση πελατών και πωλήσεων',
        organizationId: 'org_techcompany',
        createdBy: 'user_maria',
        status: 'active' as const,
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Ανανέωση Εταιρικού Website',
        description: 'Επανασχεδιασμός και ανάπτυξη του εταιρικού website',
        organizationId: 'org_techcompany',
        createdBy: 'user_giannis',
        status: 'completed' as const,
        createdAt: now,
        updatedAt: now
      }
    ]

    let insertedProjects
    try {
      console.log('Attempting to insert projects...')
      insertedProjects = await db.insert(projects).values(sampleProjects).returning()
      console.log('✅ Projects inserted successfully!')
    } catch (error) {
      console.error('❌ Error inserting projects:', error)
      throw new Error(`Failed query: Insert into 'projects' - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Create project members
    console.log('👥 Adding project members...')
    const projectMembers1 = [
      {
        projectId: insertedProjects[0].id,
        userId: 'user_maria',
        role: 'admin' as const,
        joinedAt: now
      },
      {
        projectId: insertedProjects[0].id,
        userId: 'user_elena',
        role: 'member' as const,
        joinedAt: now
      },
      {
        projectId: insertedProjects[0].id,
        userId: 'user_nikos',
        role: 'member' as const,
        joinedAt: now
      },
      {
        projectId: insertedProjects[1].id,
        userId: 'user_giannis',
        role: 'admin' as const,
        joinedAt: now
      },
      {
        projectId: insertedProjects[1].id,
        userId: 'user_sofia',
        role: 'member' as const,
        joinedAt: now
      },
      {
        projectId: insertedProjects[1].id,
        userId: 'user_elena',
        role: 'member' as const,
        joinedAt: now
      },
      {
        projectId: insertedProjects[2].id,
        userId: 'user_maria',
        role: 'admin' as const,
        joinedAt: now
      },
      {
        projectId: insertedProjects[2].id,
        userId: 'user_nikos',
        role: 'member' as const,
        joinedAt: now
      },
      {
        projectId: insertedProjects[3].id,
        userId: 'user_giannis',
        role: 'admin' as const,
        joinedAt: now
      },
      {
        projectId: insertedProjects[3].id,
        userId: 'user_sofia',
        role: 'member' as const,
        joinedAt: now
      }
    ]

    try {
      console.log('Attempting to insert project members...')
      await db.insert(projectMembers).values(projectMembers1)
      console.log('✅ Project members inserted successfully!')
    } catch (error) {
      console.error('❌ Error inserting project members:', error)
      throw new Error(`Failed query: Insert into 'project_members' - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Create tasks
    console.log('✅ Creating tasks...')
    const sampleTasks = [
      // E-Shop Project Tasks
      {
        title: 'Σχεδιασμός UI/UX για την αρχική σελίδα',
        description: 'Δημιουργία wireframes και mockups για την κεντρική σελίδα του e-shop',
        projectId: insertedProjects[0].id,
        assignedTo: 'user_elena',
        status: 'completed' as const,
        priority: 'high' as const,
        createdBy: 'user_maria',
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Ανάπτυξη συστήματος αυθεντικοποίησης',
        description: 'Υλοποίηση login/register με JWT tokens',
        projectId: insertedProjects[0].id,
        assignedTo: 'user_nikos',
        status: 'in_progress' as const,
        priority: 'high' as const,
        createdBy: 'user_maria',
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Δημιουργία βάσης δεδομένων προϊόντων',
        description: 'Σχεδιασμός και υλοποίηση schema για τα προϊόντα',
        projectId: insertedProjects[0].id,
        assignedTo: 'user_elena',
        status: 'todo' as const,
        priority: 'medium' as const,
        createdBy: 'user_maria',
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Υλοποίηση καλαθιού αγορών',
        description: 'Frontend και backend logic για το καλάθι',
        projectId: insertedProjects[0].id,
        assignedTo: 'user_nikos',
        status: 'todo' as const,
        priority: 'medium' as const,
        createdBy: 'user_maria',
        createdAt: now,
        updatedAt: now
      },
      
      // Mobile App Project Tasks
      {
        title: 'Ερευνα αγοράς και ανάλυση ανταγωνισμού',
        description: 'Μελέτη υπαρχόντων εφαρμογών και αναγκών αγοράς',
        projectId: insertedProjects[1].id,
        assignedTo: 'user_sofia',
        status: 'completed' as const,
        priority: 'high' as const,
        createdBy: 'user_giannis',
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Ανάπτυξη React Native εφαρμογής',
        description: 'Βασική δομή της εφαρμογής με navigation',
        projectId: insertedProjects[1].id,
        assignedTo: 'user_elena',
        status: 'in_progress' as const,
        priority: 'high' as const,
        createdBy: 'user_giannis',
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Ενσωμάτωση με payment gateway',
        description: 'Προσθήκη Stripe για πληρωμές',
        projectId: insertedProjects[1].id,
        assignedTo: 'user_sofia',
        status: 'todo' as const,
        priority: 'medium' as const,
        createdBy: 'user_giannis',
        createdAt: now,
        updatedAt: now
      },
      
      // CRM Project Tasks
      {
        title: 'Σχεδιασμός αρχιτεκτονικής συστήματος',
        description: 'Καθορισμός τεχνολογιών και δομής του συστήματος',
        projectId: insertedProjects[2].id,
        assignedTo: 'user_nikos',
        status: 'review' as const,
        priority: 'urgent' as const,
        createdBy: 'user_maria',
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Ανάπτυξη dashboard πελατών',
        description: 'Κεντρική σελίδα με στατιστικά και πληροφορίες',
        projectId: insertedProjects[2].id,
        assignedTo: 'user_nikos',
        status: 'todo' as const,
        priority: 'high' as const,
        createdBy: 'user_maria',
        createdAt: now,
        updatedAt: now
      }
    ]

    let insertedTasks
    try {
      console.log('Attempting to insert tasks...')
      insertedTasks = await db.insert(tasks).values(sampleTasks).returning()
      console.log('✅ Tasks inserted successfully!')
    } catch (error) {
      console.error('❌ Error inserting tasks:', error)
      throw new Error(`Failed query: Insert into 'tasks' - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Create some comments
    console.log('💬 Creating comments...')
    const sampleComments = [
      {
        content: 'Έχω ολοκληρώσει τα βασικά wireframes. Θα τα στείλω για έγκριση.',
        taskId: insertedTasks[0].id,
        projectId: insertedProjects[0].id,
        userId: 'user_elena',
        createdAt: now
      },
      {
        content: 'Εξαιρετική δουλειά! Προχωράμε στο επόμενο στάδιο.',
        taskId: insertedTasks[0].id,
        projectId: insertedProjects[0].id,
        userId: 'user_maria',
        createdAt: now
      },
      {
        content: 'Χρειάζομαι βοήθεια με το JWT implementation. Υπάρχει κάποιο documentation?',
        taskId: insertedTasks[1].id,
        projectId: insertedProjects[0].id,
        userId: 'user_nikos',
        createdAt: now
      },
      {
        content: 'Η έρευνα αγοράς έδειξε ότι χρειαζόμαστε push notifications.',
        taskId: insertedTasks[4].id,
        projectId: insertedProjects[1].id,
        userId: 'user_sofia',
        createdAt: now
      }
    ]

    try {
      console.log('Attempting to insert comments...')
      await db.insert(comments).values(sampleComments)
      console.log('✅ Comments inserted successfully!')
    } catch (error) {
      console.error('❌ Error inserting comments:', error)
      throw new Error(`Failed query: Insert into 'comments' - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Create some notifications
    console.log('🔔 Creating notifications...')
    const sampleNotifications = [
      {
        userId: 'user_nikos',
        type: 'task_assigned' as const,
        title: 'Νέα εργασία',
        message: 'Σας ανατέθηκε η εργασία "Ανάπτυξη συστήματος αυθεντικοποίησης"',
        read: false,
        createdAt: now
      },
      {
        userId: 'user_elena',
        type: 'comment_added' as const,
        title: 'Νέο σχόλιο',
        message: 'Η Μαρία σχολίασε στην εργασία "Σχεδιασμός UI/UX για την αρχική σελίδα"',
        read: false,
        createdAt: now
      },
      {
        userId: 'user_maria',
        type: 'task_completed' as const,
        title: 'Εργασία ολοκληρώθηκε',
        message: 'Η εργασία "Ερευνα αγοράς και ανάλυση ανταγωνισμού" ολοκληρώθηκε',
        read: false,
        createdAt: now
      },
      {
        userId: 'user_giannis',
        type: 'project_update' as const,
        title: 'Ενημέρωση έργου',
        message: 'Το έργο "Mobile App για Εστιατόρια" ενημερώθηκε',
        read: false,
        createdAt: now
      }
    ]

    try {
      console.log('Attempting to insert notifications...')
      await db.insert(notifications).values(sampleNotifications)
      console.log('✅ Notifications inserted successfully!')
    } catch (error) {
      console.error('❌ Error inserting notifications:', error)
      throw new Error(`Failed query: Insert into 'notifications' - ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    console.log('✅ Database seeding completed successfully!')
    console.log(`📊 Created:`)
    console.log(`   👥 ${sampleUsers.length} users`)
    console.log(`   🏢 1 organization`)
    console.log(`   👤 ${orgMembers.length} organization members`)
    console.log(`   📋 ${sampleProjects.length} projects`)
    console.log(`   👥 ${projectMembers1.length} project members`)
    console.log(`   ✅ ${sampleTasks.length} tasks`)
    console.log(`   💬 ${sampleComments.length} comments`)
    console.log(`   🔔 ${sampleNotifications.length} notifications`)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}