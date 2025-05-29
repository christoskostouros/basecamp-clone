import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { db } from '@/lib/db'
import { users, organizations, organizationMembers } from '@/lib/db'
import { eq } from 'drizzle-orm'

interface ClerkEmailAddress {
  email_address: string
  id: string
}

interface ClerkUserData {
  id: string
  email_addresses: ClerkEmailAddress[]
  first_name: string | null
  last_name: string | null
  image_url: string
  username: string | null
}

interface ClerkOrganizationData {
  id: string
  name: string
  slug: string
  image_url: string
  public_metadata: Record<string, unknown>
  private_metadata: Record<string, unknown>
  max_allowed_memberships: number
}

interface ClerkMembershipData {
  id: string
  organization: { id: string }
  user: { id: string }
  role: string
  public_metadata: Record<string, unknown>
  private_metadata: Record<string, unknown>
}

interface WebhookEvent {
  data: ClerkUserData | ClerkOrganizationData | ClerkMembershipData
  type: string
}

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

export async function POST(req: Request) {
  try {
    // Get the headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occurred -- no svix headers', {
        status: 400,
      })
    }

    // Get the body
    const payload = await req.text()
    const body = JSON.parse(payload)

    // Create a new Svix instance with your secret.
    if (!webhookSecret) {
      throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local')
    }
    const wh = new Webhook(webhookSecret)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent
    } catch (err) {
      console.error('Error verifying webhook:', err)
      return new Response('Error occurred', {
        status: 400,
      })
    }

    // Handle the webhook
    const { id } = evt.data
    const eventType = evt.type

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', body)

    // Handle user events
    if (eventType === 'user.created') {
      const userData = evt.data as ClerkUserData
      const { id, email_addresses, first_name, last_name, image_url, username } = userData

      await db.insert(users).values({
        id: id,
        email: email_addresses?.[0]?.email_address || '',
        firstName: first_name || '',
        lastName: last_name || '',
        profileImageUrl: image_url || '',
        username: username || '',
        role: 'member',
        status: 'active',
      }).onConflictDoNothing()
    }

    if (eventType === 'user.updated') {
      const userData = evt.data as ClerkUserData
      const { id, email_addresses, first_name, last_name, image_url, username } = userData

      await db.update(users)
        .set({
          email: email_addresses?.[0]?.email_address || '',
          firstName: first_name || '',
          lastName: last_name || '',
          profileImageUrl: image_url || '',
          username: username || '',
          updatedAt: new Date(),
        })
        .where(eq(users.id, id as string))
    }

    if (eventType === 'user.deleted') {
      await db.delete(users).where(eq(users.id, id as string))
    }

    // Handle organization events
    if (eventType === 'organization.created') {
      const orgData = evt.data as ClerkOrganizationData
      const { id, name, slug, image_url, public_metadata, private_metadata, max_allowed_memberships } = orgData

      await db.insert(organizations).values({
        id: id as string,
        name: name as string,
        slug: (slug as string) || (name as string).toLowerCase().replace(/\s+/g, '-'),
        profileImageUrl: (image_url as string) || '',
        maxAllowedMemberships: (max_allowed_memberships as number) || null,
        publicMetadata: JSON.stringify(public_metadata || {}),
        privateMetadata: JSON.stringify(private_metadata || {}),
      }).onConflictDoNothing()
    }

    if (eventType === 'organization.updated') {
      const orgData = evt.data as ClerkOrganizationData
      const { id, name, slug, image_url, public_metadata, private_metadata, max_allowed_memberships } = orgData

      await db.update(organizations)
        .set({
          name: name as string,
          slug: (slug as string) || (name as string).toLowerCase().replace(/\s+/g, '-'),
          profileImageUrl: (image_url as string) || '',
          maxAllowedMemberships: (max_allowed_memberships as number) || null,
          publicMetadata: JSON.stringify(public_metadata || {}),
          privateMetadata: JSON.stringify(private_metadata || {}),
          updatedAt: new Date(),
        })
        .where(eq(organizations.id, id as string))
    }

    if (eventType === 'organization.deleted') {
      await db.delete(organizations).where(eq(organizations.id, id as string))
    }

    // Handle organization membership events
    if (eventType === 'organizationMembership.created') {
      const membershipData = evt.data as ClerkMembershipData
      const { id, organization, user, role, public_metadata, private_metadata } = membershipData

      await db.insert(organizationMembers).values({
        id: id,
        organizationId: organization?.id || '',
        userId: user?.id || '',
        role: (role as 'owner' | 'admin' | 'member') || 'member',
        publicMetadata: JSON.stringify(public_metadata || {}),
        privateMetadata: JSON.stringify(private_metadata || {}),
      }).onConflictDoNothing()
    }

    if (eventType === 'organizationMembership.updated') {
      const membershipData = evt.data as ClerkMembershipData
      const { id, role, public_metadata, private_metadata } = membershipData

      await db.update(organizationMembers)
        .set({
          role: (role as 'owner' | 'admin' | 'member') || 'member',
          publicMetadata: JSON.stringify(public_metadata || {}),
          privateMetadata: JSON.stringify(private_metadata || {}),
          updatedAt: new Date(),
        })
        .where(eq(organizationMembers.id, id as string))
    }

    if (eventType === 'organizationMembership.deleted') {
      await db.delete(organizationMembers).where(eq(organizationMembers.id, id as string))
    }

    return NextResponse.json({ message: 'Webhook processed successfully' })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
}