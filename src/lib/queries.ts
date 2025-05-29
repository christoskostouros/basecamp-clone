import { db } from './db'
import { projects, tasks, users, organizations, organizationMembers, projectMembers, comments, files, timeEntries, notifications } from './db'
import { eq, desc, asc, and, or, count, sql } from 'drizzle-orm'
import type { NewProject, NewTask, NewUser, Project, Task, User } from './db'

// User queries
export async function createUser(userData: NewUser) {
  const [user] = await db.insert(users).values(userData).returning()
  return user
}

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id))
  return user
}

export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email))
  return user
}

// Organization queries
export async function getUserOrganizations(userId: string) {
  return await db
    .select({
      id: organizations.id,
      name: organizations.name,
      role: organizationMembers.role,
      joinedAt: organizationMembers.createdAt
    })
    .from(organizations)
    .innerJoin(organizationMembers, eq(organizations.id, organizationMembers.organizationId))
    .where(eq(organizationMembers.userId, userId))
}

// Project queries
export async function getProjectsByOrganization(organizationId: string) {
  return await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      status: projects.status,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      createdBy: projects.createdBy,
      memberCount: count(projectMembers.userId),
      taskCount: count(tasks.id)
    })
    .from(projects)
    .leftJoin(projectMembers, eq(projects.id, projectMembers.projectId))
    .leftJoin(tasks, eq(projects.id, tasks.projectId))
    .where(eq(projects.organizationId, organizationId))
    .groupBy(projects.id)
    .orderBy(desc(projects.updatedAt))
}

export async function getProjectById(projectId: string) {
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId))

  return project
}

export async function createProject(projectData: NewProject) {
  const [project] = await db.insert(projects).values(projectData).returning()
  return project
}

export async function updateProject(projectId: string, updates: Partial<NewProject>) {
  const [project] = await db
    .update(projects)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(projects.id, projectId))
    .returning()

  return project
}

// Task queries
export async function getTasksByProject(projectId: string) {
  return await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      priority: tasks.priority,
      dueDate: tasks.dueDate,
      createdAt: tasks.createdAt,
      updatedAt: tasks.updatedAt,
      assigneeName: sql<string>`${users.firstName} || ' ' || ${users.lastName}`.as('assigneeName'),
      assigneeEmail: users.email,
      createdByName: sql<string>`creator.first_name || ' ' || creator.last_name`.as('createdByName')
    })
    .from(tasks)
    .leftJoin(users, eq(tasks.assignedTo, users.id))
    .leftJoin(users, eq(tasks.createdBy, users.id))
    .where(eq(tasks.projectId, projectId))
    .orderBy(desc(tasks.createdAt))
}

export async function getTasksByUser(userId: string) {
  return await db
    .select({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      status: tasks.status,
      priority: tasks.priority,
      dueDate: tasks.dueDate,
      projectName: projects.name,
      projectId: projects.id
    })
    .from(tasks)
    .innerJoin(projects, eq(tasks.projectId, projects.id))
    .where(eq(tasks.assignedTo, userId))
    .orderBy(desc(tasks.updatedAt))
}

export async function createTask(taskData: NewTask) {
  const [task] = await db.insert(tasks).values(taskData).returning()
  return task
}

export async function updateTask(taskId: string, updates: Partial<NewTask>) {
  const [task] = await db
    .update(tasks)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(tasks.id, taskId))
    .returning()

  return task
}

export async function deleteTask(taskId: string) {
  await db.delete(tasks).where(eq(tasks.id, taskId))
}

// Project member queries
export async function getProjectMembers(projectId: string) {
  return await db
    .select({
      userId: users.id,
      name: sql<string>`${users.firstName} || ' ' || ${users.lastName}`.as('name'),
      email: users.email,
      avatar: users.profileImageUrl,
      role: projectMembers.role,
      joinedAt: projectMembers.joinedAt
    })
    .from(projectMembers)
    .innerJoin(users, eq(projectMembers.userId, users.id))
    .where(eq(projectMembers.projectId, projectId))
    .orderBy(asc(users.firstName))
}

export async function addProjectMember(projectId: string, userId: string, role: 'admin' | 'member' | 'viewer' = 'member') {
  const [member] = await db
    .insert(projectMembers)
    .values({
      projectId,
      userId,
      role,
      joinedAt: new Date()
    })
    .returning()

  return member
}

// Comment queries
export async function getTaskComments(taskId: string) {
  return await db
    .select({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      authorName: sql<string>`${users.firstName} || ' ' || ${users.lastName}`.as('authorName'),
      authorAvatar: users.profileImageUrl
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.taskId, taskId))
    .orderBy(asc(comments.createdAt))
}

export async function createComment(commentData: {
  content: string
  taskId?: string
  projectId?: string
  userId: string
}) {
  const [comment] = await db.insert(comments).values(commentData).returning()
  return comment
}

// File queries
export async function getProjectFiles(projectId: string) {
  return await db
    .select({
      id: files.id,
      name: files.name,
      fileUrl: files.fileUrl,
      fileType: files.fileType,
      size: files.size,
      createdAt: files.createdAt,
      uploaderName: sql<string>`${users.firstName} || ' ' || ${users.lastName}`.as('uploaderName')
    })
    .from(files)
    .innerJoin(users, eq(files.uploadedBy, users.id))
    .where(eq(files.projectId, projectId))
    .orderBy(desc(files.createdAt))
}

// Dashboard stats
export async function getDashboardStats(userId: string) {
  const userOrgs = await getUserOrganizations(userId)
  const orgIds = userOrgs.map(org => org.id)

  if (orgIds.length === 0) {
    return {
      activeProjects: 0,
      pendingTasks: 0,
      completedTasks: 0,
      teamMembers: 0
    }
  }

  const orgFilter = orgIds.length === 1 
    ? eq(projects.organizationId, orgIds[0])
    : sql`${projects.organizationId} IN (${orgIds.map(id => `'${id}'`).join(',')})`

  const [stats] = await db
    .select({
      activeProjects: count(sql`DISTINCT CASE WHEN ${projects.status} = 'active' THEN ${projects.id} END`),
      totalTasks: count(sql`DISTINCT ${tasks.id}`),
      completedTasks: count(sql`DISTINCT CASE WHEN ${tasks.status} = 'completed' THEN ${tasks.id} END`),
      teamMembers: count(sql`DISTINCT ${organizationMembers.userId}`)
    })
    .from(projects)
    .leftJoin(tasks, eq(projects.id, tasks.projectId))
    .leftJoin(organizationMembers, eq(projects.organizationId, organizationMembers.organizationId))
    .where(orgFilter)

  return {
    activeProjects: stats.activeProjects || 0,
    pendingTasks: (stats.totalTasks || 0) - (stats.completedTasks || 0),
    completedTasks: stats.completedTasks || 0,
    teamMembers: stats.teamMembers || 0
  }
}

// Notification queries
export async function getUserNotifications(userId: string, limit = 10) {
  return await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit)
}

export async function createNotification(notificationData: {
  userId: string
  type: 'task_assigned' | 'task_completed' | 'comment_added' | 'project_update' | 'deadline_reminder'
  title: string
  message: string
}) {
  const [notification] = await db.insert(notifications).values(notificationData).returning()
  return notification
}

export async function markNotificationAsRead(notificationId: string) {
  await db
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.id, notificationId))
}

// Enhanced project queries for projects page
export async function getAllProjectsForUser(userId: string) {
  const userOrgs = await getUserOrganizations(userId)
  const orgIds = userOrgs.map(org => org.id)

  if (orgIds.length === 0) {
    return []
  }

  return await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      status: projects.status,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      createdBy: projects.createdBy,
      organizationId: projects.organizationId,
      memberCount: count(sql`DISTINCT ${projectMembers.userId}`),
      totalTasks: count(sql`DISTINCT ${tasks.id}`),
      completedTasks: count(sql`DISTINCT CASE WHEN ${tasks.status} = 'completed' THEN ${tasks.id} END`),
      pendingTasks: count(sql`DISTINCT CASE WHEN ${tasks.status} != 'completed' THEN ${tasks.id} END`),
      // Calculate progress as percentage
      progress: sql<number>`
        CASE 
          WHEN COUNT(DISTINCT ${tasks.id}) = 0 THEN 0
          ELSE ROUND(
            (COUNT(DISTINCT CASE WHEN ${tasks.status} = 'completed' THEN ${tasks.id} END) * 100.0) / 
            COUNT(DISTINCT ${tasks.id})
          )
        END
      `.as('progress')
    })
    .from(projects)
    .leftJoin(projectMembers, eq(projects.id, projectMembers.projectId))
    .leftJoin(tasks, eq(projects.id, tasks.projectId))
    .where(
      orgIds.length === 1 
        ? eq(projects.organizationId, orgIds[0])
        : sql`${projects.organizationId} IN (${orgIds.map(id => `'${id}'`).join(',')})`
    )
    .groupBy(projects.id, projects.organizationId)
    .orderBy(desc(projects.updatedAt))
}

export async function getProjectsWithFilter(userId: string, statusFilter?: string, searchTerm?: string) {
  const userOrgs = await getUserOrganizations(userId)
  const orgIds = userOrgs.map(org => org.id)

  if (orgIds.length === 0) {
    return []
  }

  const query = db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      status: projects.status,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      createdBy: projects.createdBy,
      organizationId: projects.organizationId,
      memberCount: count(sql`DISTINCT ${projectMembers.userId}`),
      totalTasks: count(sql`DISTINCT ${tasks.id}`),
      completedTasks: count(sql`DISTINCT CASE WHEN ${tasks.status} = 'completed' THEN ${tasks.id} END`),
      pendingTasks: count(sql`DISTINCT CASE WHEN ${tasks.status} != 'completed' THEN ${tasks.id} END`),
      progress: sql<number>`
        CASE 
          WHEN COUNT(DISTINCT ${tasks.id}) = 0 THEN 0
          ELSE ROUND(
            (COUNT(DISTINCT CASE WHEN ${tasks.status} = 'completed' THEN ${tasks.id} END) * 100.0) / 
            COUNT(DISTINCT ${tasks.id})
          )
        END
      `.as('progress')
    })
    .from(projects)
    .leftJoin(projectMembers, eq(projects.id, projectMembers.projectId))
    .leftJoin(tasks, eq(projects.id, tasks.projectId))

  // Build where conditions
  const whereConditions = [
    orgIds.length === 1 
      ? eq(projects.organizationId, orgIds[0])
      : sql`${projects.organizationId} IN (${orgIds.map(id => `'${id}'`).join(',')})`
  ]

  if (statusFilter && statusFilter !== 'all') {
    if (statusFilter === 'active') {
      whereConditions.push(
        or(
          eq(projects.status, 'active'),
          eq(projects.status, 'on_hold')
        )!
      )
    } else {
      whereConditions.push(eq(projects.status, statusFilter as 'active' | 'on_hold' | 'completed' | 'archived'))
    }
  }

  if (searchTerm) {
    whereConditions.push(
      or(
        sql`LOWER(${projects.name}) LIKE LOWER(${'%' + searchTerm + '%'})`,
        sql`LOWER(${projects.description}) LIKE LOWER(${'%' + searchTerm + '%'})`
      )!
    )
  }

  return await query
    .where(and(...whereConditions))
    .groupBy(projects.id, projects.organizationId)
    .orderBy(desc(projects.updatedAt))
}

// Dashboard specific queries
export async function getRecentProjects(userId: string, limit = 6) {
  const userOrgs = await getUserOrganizations(userId)
  const orgIds = userOrgs.map(org => org.id)

  if (orgIds.length === 0) {
    return []
  }

  return await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      status: projects.status,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      memberCount: count(sql`DISTINCT ${projectMembers.userId}`),
      totalTasks: count(sql`DISTINCT ${tasks.id}`),
      completedTasks: count(sql`DISTINCT CASE WHEN ${tasks.status} = 'completed' THEN ${tasks.id} END`),
      pendingTasks: count(sql`DISTINCT CASE WHEN ${tasks.status} != 'completed' THEN ${tasks.id} END`)
    })
    .from(projects)
    .leftJoin(projectMembers, eq(projects.id, projectMembers.projectId))
    .leftJoin(tasks, eq(projects.id, tasks.projectId))
    .where(
      orgIds.length === 1 
        ? eq(projects.organizationId, orgIds[0])
        : sql`${projects.organizationId} IN (${orgIds.map(id => `'${id}'`).join(',')})`
    )
    .groupBy(projects.id)
    .orderBy(desc(projects.updatedAt))
    .limit(limit)
}

export async function getRecentActivity(userId: string, limit = 10) {
  const userOrgs = await getUserOrganizations(userId)
  const orgIds = userOrgs.map(org => org.id)

  if (orgIds.length === 0) {
    return []
  }

  const orgFilter = orgIds.length === 1 
    ? eq(projects.organizationId, orgIds[0])
    : sql`${projects.organizationId} IN (${orgIds.map(id => `'${id}'`).join(',')})`

  // Get recent task updates
  const recentTaskUpdates = await db
    .select({
      id: tasks.id,
      type: sql<string>`'task_update'`.as('type'),
      title: sql<string>`'Η εργασία "' || ${tasks.title} || '" ενημερώθηκε'`.as('title'),
      description: sql<string>`${tasks.status} || ' • ' || ${projects.name}`.as('description'),
      createdAt: tasks.updatedAt,
      projectName: projects.name,
      taskTitle: tasks.title,
      status: tasks.status
    })
    .from(tasks)
    .innerJoin(projects, eq(tasks.projectId, projects.id))
    .where(orgFilter)
    .orderBy(desc(tasks.updatedAt))
    .limit(limit)

  // Get recent comments
  const recentComments = await db
    .select({
      id: comments.id,
      type: sql<string>`'comment'`.as('type'),
      title: sql<string>`'Νέο σχόλιο στην εργασία "' || ${tasks.title} || '"'`.as('title'),
      description: sql<string>`${users.firstName} || ' ' || ${users.lastName} || ' • ' || ${projects.name}`.as('description'),
      createdAt: comments.createdAt,
      projectName: projects.name,
      taskTitle: tasks.title,
      authorName: sql<string>`${users.firstName} || ' ' || ${users.lastName}`.as('authorName')
    })
    .from(comments)
    .leftJoin(tasks, eq(comments.taskId, tasks.id))
    .leftJoin(projects, eq(tasks.projectId, projects.id))
    .innerJoin(users, eq(comments.userId, users.id))
    .where(and(
      orgFilter,
      sql`${comments.taskId} IS NOT NULL`
    ))
    .orderBy(desc(comments.createdAt))
    .limit(limit)

  // Combine and sort by date
  const allActivity = [...recentTaskUpdates, ...recentComments]
  allActivity.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  
  return allActivity.slice(0, limit)
}
