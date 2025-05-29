import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (body.authorization !== 'migrate-db-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔄 Running database migrations...')

    // Drop existing tables if they exist (for clean start)
    if (body.reset === true) {
      console.log('🗑️ Resetting database...')
<<<<<<< HEAD
      await sql`DROP TABLE IF EXISTS "notifications" CASCADE;`
      await sql`DROP TABLE IF EXISTS "comments" CASCADE;`
      await sql`DROP TABLE IF EXISTS "tasks" CASCADE;`
      await sql`DROP TABLE IF EXISTS "project_members" CASCADE;`
      await sql`DROP TABLE IF EXISTS "projects" CASCADE;`
      await sql`DROP TABLE IF EXISTS "organization_members" CASCADE;`
      await sql`DROP TABLE IF EXISTS "organizations" CASCADE;`
      await sql`DROP TABLE IF EXISTS "users" CASCADE;`
=======
      await sql(`DROP TABLE IF EXISTS "notifications" CASCADE;`)
      await sql(`DROP TABLE IF EXISTS "comments" CASCADE;`)
      await sql(`DROP TABLE IF EXISTS "tasks" CASCADE;`)
      await sql(`DROP TABLE IF EXISTS "project_members" CASCADE;`)
      await sql(`DROP TABLE IF EXISTS "projects" CASCADE;`)
      await sql(`DROP TABLE IF EXISTS "organization_members" CASCADE;`)
      await sql(`DROP TABLE IF EXISTS "organizations" CASCADE;`)
      await sql(`DROP TABLE IF EXISTS "users" CASCADE;`)
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      console.log('✅ Old tables dropped')
    }

    // Create users table
<<<<<<< HEAD
    await sql`CREATE TABLE IF NOT EXISTS "users" (
=======
    await sql(`CREATE TABLE IF NOT EXISTS "users" (
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "clerk_id" varchar(255) UNIQUE NOT NULL,
      "email" varchar(255) UNIQUE NOT NULL,
      "username" varchar(255),
      "first_name" varchar(255),
      "last_name" varchar(255),
      "profile_image_url" text DEFAULT '',
      "public_metadata" text DEFAULT '{}',
      "private_metadata" text DEFAULT '{}',
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
<<<<<<< HEAD
    );`

    // Create organizations table
    await sql`CREATE TABLE IF NOT EXISTS "organizations" (
=======
    );`)

    // Create organizations table
    await sql(`CREATE TABLE IF NOT EXISTS "organizations" (
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "name" varchar(255) NOT NULL,
      "slug" varchar(255) UNIQUE NOT NULL,
      "public_metadata" text DEFAULT '{}',
      "private_metadata" text DEFAULT '{}',
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
<<<<<<< HEAD
    );`

    // Create organization_members table
    await sql`CREATE TABLE IF NOT EXISTS "organization_members" (
=======
    );`)

    // Create organization_members table
    await sql(`CREATE TABLE IF NOT EXISTS "organization_members" (
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "organization_id" varchar(255) NOT NULL,
      "user_id" varchar(255) NOT NULL,
      "role" varchar(50) DEFAULT 'member' NOT NULL,
      "joined_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT fk_org_members_org FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE,
      CONSTRAINT fk_org_members_user FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
      UNIQUE("organization_id", "user_id")
<<<<<<< HEAD
    );`

    // Create projects table
    await sql`CREATE TABLE IF NOT EXISTS "projects" (
=======
    );`)

    // Create projects table
    await sql(`CREATE TABLE IF NOT EXISTS "projects" (
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "name" varchar(255) NOT NULL,
      "description" text,
      "status" varchar(50) DEFAULT 'active' NOT NULL,
      "organization_id" varchar(255) NOT NULL,
      "created_by_id" varchar(255) NOT NULL,
      "due_date" timestamp,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT fk_projects_org FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE,
      CONSTRAINT fk_projects_creator FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE
<<<<<<< HEAD
    );`

    // Create project_members table
    await sql`CREATE TABLE IF NOT EXISTS "project_members" (
=======
    );`)

    // Create project_members table
    await sql(`CREATE TABLE IF NOT EXISTS "project_members" (
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "project_id" varchar(255) NOT NULL,
      "user_id" varchar(255) NOT NULL,
      "role" varchar(50) DEFAULT 'member' NOT NULL,
      "joined_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT fk_proj_members_proj FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE,
      CONSTRAINT fk_proj_members_user FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
      UNIQUE("project_id", "user_id")
<<<<<<< HEAD
    );`

    // Create tasks table
    await sql`CREATE TABLE IF NOT EXISTS "tasks" (
=======
    );`)

    // Create tasks table
    await sql(`CREATE TABLE IF NOT EXISTS "tasks" (
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "title" varchar(255) NOT NULL,
      "description" text,
      "status" varchar(50) DEFAULT 'todo' NOT NULL,
      "priority" varchar(50) DEFAULT 'medium' NOT NULL,
      "project_id" varchar(255) NOT NULL,
      "assignee_id" varchar(255),
      "created_by_id" varchar(255) NOT NULL,
      "due_date" timestamp,
      "completed_at" timestamp,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT fk_tasks_project FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE,
      CONSTRAINT fk_tasks_assignee FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE SET NULL,
      CONSTRAINT fk_tasks_creator FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE
<<<<<<< HEAD
    );`

    // Create comments table
    await sql`CREATE TABLE IF NOT EXISTS "comments" (
=======
    );`)

    // Create comments table
    await sql(`CREATE TABLE IF NOT EXISTS "comments" (
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "content" text NOT NULL,
      "task_id" varchar(255),
      "project_id" varchar(255),
      "author_id" varchar(255) NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT fk_comments_task FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE,
      CONSTRAINT fk_comments_project FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE,
      CONSTRAINT fk_comments_author FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE
<<<<<<< HEAD
    );`

    // Create notifications table
    await sql`CREATE TABLE IF NOT EXISTS "notifications" (
=======
    );`)

    // Create notifications table
    await sql(`CREATE TABLE IF NOT EXISTS "notifications" (
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "title" varchar(255) NOT NULL,
      "message" text,
      "type" varchar(50) DEFAULT 'info' NOT NULL,
      "user_id" varchar(255) NOT NULL,
      "read" boolean DEFAULT false NOT NULL,
      "task_id" varchar(255),
      "project_id" varchar(255),
      "created_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT fk_notifications_user FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
      CONSTRAINT fk_notifications_task FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE,
      CONSTRAINT fk_notifications_project FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE
<<<<<<< HEAD
    );`

    // Create indexes for performance
    await sql`CREATE INDEX IF NOT EXISTS "idx_users_clerk_id" ON "users"("clerk_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users"("email");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_org_members_org_id" ON "organization_members"("organization_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_org_members_user_id" ON "organization_members"("user_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_projects_org_id" ON "projects"("organization_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_projects_creator" ON "projects"("created_by_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_proj_members_proj_id" ON "project_members"("project_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_proj_members_user_id" ON "project_members"("user_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_tasks_project_id" ON "tasks"("project_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_tasks_assignee_id" ON "tasks"("assignee_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_tasks_creator" ON "tasks"("created_by_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_comments_task_id" ON "comments"("task_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_comments_project_id" ON "comments"("project_id");`
    await sql`CREATE INDEX IF NOT EXISTS "idx_notifications_user_id" ON "notifications"("user_id");`
=======
    );`)

    // Create indexes for performance
    await sql(`CREATE INDEX IF NOT EXISTS "idx_users_clerk_id" ON "users"("clerk_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users"("email");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_org_members_org_id" ON "organization_members"("organization_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_org_members_user_id" ON "organization_members"("user_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_projects_org_id" ON "projects"("organization_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_projects_creator" ON "projects"("created_by_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_proj_members_proj_id" ON "project_members"("project_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_proj_members_user_id" ON "project_members"("user_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_tasks_project_id" ON "tasks"("project_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_tasks_assignee_id" ON "tasks"("assignee_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_tasks_creator" ON "tasks"("created_by_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_comments_task_id" ON "comments"("task_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_comments_project_id" ON "comments"("project_id");`)
    await sql(`CREATE INDEX IF NOT EXISTS "idx_notifications_user_id" ON "notifications"("user_id");`)
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec

    console.log('✅ Database migrations completed successfully!')

    // Check table status
<<<<<<< HEAD
    const tables = await sql`
=======
    const tables = await sql(`
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
<<<<<<< HEAD
    `

    // Get table counts (simplified for build compatibility)
    const stats = {
      'note': 'Table counts temporarily disabled for build compatibility'
=======
    `)

    // Get table counts
    const stats = {}
    for (const table of tables) {
      try {
        const count = await sql(`SELECT COUNT(*) as count FROM "${table.table_name}"`)
        stats[table.table_name] = parseInt(count[0].count)
      } catch (e) {
        stats[table.table_name] = 'error'
      }
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
    }

    return NextResponse.json({
      success: true,
      message: 'Database schema migration completed successfully! 🎉',
      tablesCreated: tables.map(t => t.table_name),
      recordCounts: stats,
<<<<<<< HEAD
      nextStep: 'Ready for seeding! Use /api/seed endpoint.'
=======
      nextStep: 'Ready for seeding! Use /api/seed endpoint.',
      timestamp: new Date().toISOString()
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
    })

  } catch (error) {
    console.error('❌ Migration failed:', error)
    return NextResponse.json({
      error: 'Failed to run migrations',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Check if tables exist
<<<<<<< HEAD
    const tables = await sql`
=======
    const tables = await sql(`
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
<<<<<<< HEAD
    `

    // Get table record counts (simplified for build compatibility)
    const stats = {
      'note': 'Table counts temporarily disabled for build compatibility'
    }

    return NextResponse.json({
      message: 'Database Status Check',
=======
    `)

    // Get table record counts
    const stats = {}
    for (const table of tables) {
      try {
        const count = await sql(`SELECT COUNT(*) as count FROM "${table.table_name}"`)
        stats[table.table_name] = parseInt(count[0].count)
      } catch (e) {
        stats[table.table_name] = 'error'
      }
    }

    return NextResponse.json({
      message: 'Database Migration Status Check ✅',
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
      tablesFound: tables.map(t => t.table_name),
      recordCounts: stats,
      instructions: {
        migrate: 'POST with {"authorization": "migrate-db-2024"} to create schema',
        reset: 'POST with {"authorization": "migrate-db-2024", "reset": true} to reset and recreate',
        seed: 'Use /api/seed endpoint after migration'
<<<<<<< HEAD
      }
=======
      },
      timestamp: new Date().toISOString(),
      endpoint: 'https://basecamp-clone-gold.vercel.app/api/migrate'
>>>>>>> 4ab2a9381f2e953a688f1b8575360f9cea6a4eec
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to check database status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}