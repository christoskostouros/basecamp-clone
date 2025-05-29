import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
  pgEnum,
  uuid,
  decimal
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'manager', 'member']);
export const organizationRoleEnum = pgEnum('organization_role', ['owner', 'admin', 'member']);
export const projectRoleEnum = pgEnum('project_role', ['admin', 'member', 'viewer']);
export const projectStatusEnum = pgEnum('project_status', ['active', 'on_hold', 'completed', 'archived']);
export const taskStatusEnum = pgEnum('task_status', ['todo', 'in_progress', 'review', 'completed']);
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high', 'urgent']);
export const notificationTypeEnum = pgEnum('notification_type', ['task_assigned', 'task_completed', 'comment_added', 'project_update', 'deadline_reminder']);

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  username: varchar('username', { length: 255 }),
  profileImageUrl: text('profile_image_url'),
  role: userRoleEnum('role').default('member').notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Organizations table
export const organizations = pgTable('organizations', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }),
  profileImageUrl: text('profile_image_url'),
  maxAllowedMemberships: integer('max_allowed_memberships'),
  publicMetadata: text('public_metadata').default('{}'),
  privateMetadata: text('private_metadata').default('{}'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Organization members
export const organizationMembers = pgTable('organization_members', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: organizationRoleEnum('role').default('member').notNull(),
  publicMetadata: text('public_metadata').default('{}'),
  privateMetadata: text('private_metadata').default('{}'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Projects table
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  createdBy: text('created_by').references(() => users.id).notNull(),
  status: projectStatusEnum('status').default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Project members
export const projectMembers = pgTable('project_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: projectRoleEnum('role').default('member').notNull(),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
});

// Tasks table
export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description'),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  assignedTo: text('assigned_to').references(() => users.id),
  status: taskStatusEnum('status').default('todo').notNull(),
  priority: taskPriorityEnum('priority').default('medium').notNull(),
  dueDate: timestamp('due_date'),
  createdBy: text('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Comments table
export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  taskId: uuid('task_id').references(() => tasks.id, { onDelete: 'cascade' }),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Files table
export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  fileUrl: text('file_url').notNull(),
  fileType: varchar('file_type', { length: 100 }),
  size: integer('size'),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  uploadedBy: text('uploaded_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Time entries table
export const timeEntries = pgTable('time_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  taskId: uuid('task_id').references(() => tasks.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  description: text('description'),
  duration: integer('duration').notNull(), // in minutes
  date: timestamp('date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Notifications table
export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: notificationTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  organizationMembers: many(organizationMembers),
  projectMembers: many(projectMembers),
  createdProjects: many(projects),
  assignedTasks: many(tasks),
  createdTasks: many(tasks),
  comments: many(comments),
  uploadedFiles: many(files),
  timeEntries: many(timeEntries),
  notifications: many(notifications),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(organizationMembers),
  projects: many(projects),
}));

export const organizationMembersRelations = relations(organizationMembers, ({ one }) => ({
  organization: one(organizations, {
    fields: [organizationMembers.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [organizationMembers.userId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [projects.organizationId],
    references: [organizations.id],
  }),
  creator: one(users, {
    fields: [projects.createdBy],
    references: [users.id],
  }),
  members: many(projectMembers),
  tasks: many(tasks),
  comments: many(comments),
  files: many(files),
}));

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectMembers.userId],
    references: [users.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  assignee: one(users, {
    fields: [tasks.assignedTo],
    references: [users.id],
  }),
  creator: one(users, {
    fields: [tasks.createdBy],
    references: [users.id],
  }),
  comments: many(comments),
  timeEntries: many(timeEntries),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  task: one(tasks, {
    fields: [comments.taskId],
    references: [tasks.id],
  }),
  project: one(projects, {
    fields: [comments.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export const filesRelations = relations(files, ({ one }) => ({
  project: one(projects, {
    fields: [files.projectId],
    references: [projects.id],
  }),
  uploader: one(users, {
    fields: [files.uploadedBy],
    references: [users.id],
  }),
}));

export const timeEntriesRelations = relations(timeEntries, ({ one }) => ({
  task: one(tasks, {
    fields: [timeEntries.taskId],
    references: [tasks.id],
  }),
  user: one(users, {
    fields: [timeEntries.userId],
    references: [users.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
