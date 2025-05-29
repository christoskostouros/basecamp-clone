import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/projects(.*)',
  '/project(.*)',
  '/tasks(.*)',
  '/team(.*)',
  '/user-profile(.*)',
  '/organization-profile(.*)',
  '/create-organization(.*)',
])

// Define routes that require organization context
const isOrganizationRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/projects(.*)',
  '/project(.*)',
  '/tasks(.*)',
  '/team(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
  
  // For organization routes, we can optionally protect by organization
  // This is commented out for now but can be enabled if needed
  // if (isOrganizationRoute(req)) {
  //   await auth.protect({ role: 'org:admin' })
  // }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}