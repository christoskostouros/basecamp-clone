import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, organizations, organizationMembers, projects, projectMembers, tasks, comments, notifications } from '@/lib/db'
import { eq, and } from 'drizzle-orm'

// Migration functionality
async function handleMigration(body: any) {
  try {
    const { neon } = await import('@neondatabase/serverless')
    const sql = neon(process.env.DATABASE_URL!)

    // Drop existing tables if reset requested
    if (body.reset === true) {
      console.log('🗑️ Resetting database...')
      await sql`DROP TABLE IF EXISTS "todo_items" CASCADE;`
      await sql`DROP TABLE IF EXISTS "todo_lists" CASCADE;`
      await sql`DROP TABLE IF EXISTS "post_replies" CASCADE;`
      await sql`DROP TABLE IF EXISTS "posts" CASCADE;`
      await sql`DROP TABLE IF EXISTS "threads" CASCADE;`
      await sql`DROP TABLE IF EXISTS "notifications" CASCADE;`
      await sql`DROP TABLE IF EXISTS "comments" CASCADE;`
      await sql`DROP TABLE IF EXISTS "tasks" CASCADE;`
      await sql`DROP TABLE IF EXISTS "project_members" CASCADE;`
      await sql`DROP TABLE IF EXISTS "projects" CASCADE;`
      await sql`DROP TABLE IF EXISTS "organization_members" CASCADE;`
      await sql`DROP TABLE IF EXISTS "organizations" CASCADE;`
      await sql`DROP TABLE IF EXISTS "users" CASCADE;`
      console.log('✅ Old tables dropped')
    }

    // 1. Core tables
    await sql`CREATE TABLE IF NOT EXISTS "users" (
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
    );`

    await sql`CREATE TABLE IF NOT EXISTS "organizations" (
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "name" varchar(255) NOT NULL,
      "slug" varchar(255) UNIQUE NOT NULL,
      "public_metadata" text DEFAULT '{}',
      "private_metadata" text DEFAULT '{}',
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );`

    await sql`CREATE TABLE IF NOT EXISTS "organization_members" (
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "organization_id" varchar(255) NOT NULL,
      "user_id" varchar(255) NOT NULL,
      "role" varchar(50) DEFAULT 'member' NOT NULL,
      "joined_at" timestamp DEFAULT now() NOT NULL,
      UNIQUE("organization_id", "user_id")
    );`

    // 2. Projects and tasks
    await sql`CREATE TABLE IF NOT EXISTS "projects" (
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "name" varchar(255) NOT NULL,
      "description" text,
      "status" varchar(50) DEFAULT 'active' NOT NULL,
      "organization_id" varchar(255) NOT NULL,
      "created_by_id" varchar(255) NOT NULL,
      "due_date" timestamp,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );`

    await sql`CREATE TABLE IF NOT EXISTS "project_members" (
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "project_id" varchar(255) NOT NULL,
      "user_id" varchar(255) NOT NULL,
      "role" varchar(50) DEFAULT 'member' NOT NULL,
      "joined_at" timestamp DEFAULT now() NOT NULL,
      UNIQUE("project_id", "user_id")
    );`

    await sql`CREATE TABLE IF NOT EXISTS "tasks" (
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
      "updated_at" timestamp DEFAULT now() NOT NULL
    );`

    // 3. NEW: Posts/Threads feature
    await sql`CREATE TABLE IF NOT EXISTS "threads" (
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "title" varchar(255) NOT NULL,
      "description" text,
      "organization_id" varchar(255) NOT NULL,
      "project_id" varchar(255),
      "created_by_id" varchar(255) NOT NULL,
      "pinned" boolean DEFAULT false NOT NULL,
      "locked" boolean DEFAULT false NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );`

    await sql`CREATE TABLE IF NOT EXISTS "posts" (
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "content" text NOT NULL,
      "thread_id" varchar(255) NOT NULL,
      "author_id" varchar(255) NOT NULL,
      "reply_to_id" varchar(255),
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );`

    // 4. NEW: Todo Lists feature
    await sql`CREATE TABLE IF NOT EXISTS "todo_lists" (
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "title" varchar(255) NOT NULL,
      "description" text,
      "organization_id" varchar(255) NOT NULL,
      "project_id" varchar(255),
      "created_by_id" varchar(255) NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );`

    await sql`CREATE TABLE IF NOT EXISTS "todo_items" (
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "title" varchar(255) NOT NULL,
      "description" text,
      "completed" boolean DEFAULT false NOT NULL,
      "todo_list_id" varchar(255) NOT NULL,
      "assignee_id" varchar(255),
      "due_date" timestamp,
      "completed_at" timestamp,
      "position" integer DEFAULT 0 NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );`

    // 5. Comments and notifications (updated)
    await sql`CREATE TABLE IF NOT EXISTS "comments" (
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "content" text NOT NULL,
      "task_id" varchar(255),
      "project_id" varchar(255),
      "thread_id" varchar(255),
      "todo_item_id" varchar(255),
      "author_id" varchar(255) NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );`

    await sql`CREATE TABLE IF NOT EXISTS "notifications" (
      "id" varchar(255) PRIMARY KEY NOT NULL,
      "title" varchar(255) NOT NULL,
      "message" text,
      "type" varchar(50) DEFAULT 'info' NOT NULL,
      "user_id" varchar(255) NOT NULL,
      "read" boolean DEFAULT false NOT NULL,
      "task_id" varchar(255),
      "project_id" varchar(255),
      "thread_id" varchar(255),
      "post_id" varchar(255),
      "todo_item_id" varchar(255),
      "created_at" timestamp DEFAULT now() NOT NULL
    );`

    console.log('✅ Database migration completed successfully!')

    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;`

    return NextResponse.json({
      success: true,
      message: 'Complete database schema migration successful! 🎉',
      tablesCreated: tables.map((t: any) => t.table_name),
      features: [
        '✅ Users & Organizations',
        '✅ Projects & Tasks',
        '✅ Posts & Threads (NEW)',
        '✅ Todo Lists (NEW)',
        '✅ Comments & Notifications'
      ],
      nextStep: 'Ready for seeding with sample data!'
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
  return NextResponse.json({
    message: 'Database seed and migration endpoint',
    status: 'ready',
    endpoints: {
      POST: 'Run migrations or seeding',
      authorization: 'migrate-db-2024 (for migrations) or seed-db-2024 (for seeding)'
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Authorization check for both seeding and migration
    if (body.authorization !== 'seed-db-2024' && body.authorization !== 'migrate-db-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Handle migration requests
    if (body.authorization === 'migrate-db-2024') {
      console.log('🔄 Running database migrations...')
      return await handleMigration(body)
    }

    console.log('🌱 Starting database seed...')

    // Check if organization already exists
    const existingOrg = await db.select().from(organizations).where(eq(organizations.id, 'org_sample_1')).limit(1)

    if (existingOrg.length > 0) {
      console.log('✅ Organization already exists, checking users...')

      // Check if users exist
      const existingUsers = await db.select().from(users).limit(5)
      const userCount = existingUsers.length

      return NextResponse.json({
        success: true,
        message: `Database already seeded! Found ${userCount} users and organization: ${existingOrg[0].name}`,
        data: {
          organization: existingOrg[0],
          userCount: userCount
        }
      })
    }

    // Simple seeding functionality (to be expanded)
    return NextResponse.json({
      success: true,
      message: 'Seeding functionality ready to be implemented',
      note: 'Run migration first to create schema'
    })

  } catch (error) {
    console.error('❌ Seed/Migration error:', error)
    return NextResponse.json({
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
