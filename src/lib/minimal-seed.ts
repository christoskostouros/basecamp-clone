import { db } from './db'
import { users } from './db'

export async function minimalSeedDatabase() {
  console.log('🌱 Starting MINIMAL database seeding...')

  try {
    // Clear existing data
    console.log('🧹 Clearing existing users...')
    await db.delete(users)

    // Create ONE sample user with ONLY required fields
    console.log('👥 Creating one user...')
    const oneUser = {
      id: 'user_test',
      email: 'test@test.com'
    }

    console.log('Attempting to insert minimal user...')
    console.log('User data:', JSON.stringify(oneUser, null, 2))
    await db.insert(users).values(oneUser)
    console.log('✅ Minimal user inserted successfully!')

    console.log('✅ Minimal database seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error in minimal seeding:', error)
    throw error
  }
}