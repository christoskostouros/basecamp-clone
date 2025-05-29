'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserButton, useUser, OrganizationSwitcher } from '@clerk/nextjs'

export function Navigation() {
  const { isSignedIn, user } = useUser()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-yellow-600">Basecamp</span>
            </Link>

            {isSignedIn && (
              <>
                <div className="ml-8">
                  <OrganizationSwitcher
                    appearance={{
                      elements: {
                        organizationSwitcherTrigger: 'border border-gray-300 rounded-md px-3 py-2 text-sm',
                        organizationSwitcherPopover: 'shadow-lg border',
                        organizationPreview: 'hover:bg-gray-50'
                      }
                    }}
                    createOrganizationUrl="/create-organization"
                    organizationProfileUrl="/organization-profile"
                  />
                </div>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                  <Link
                    href="/dashboard"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/projects"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                  >
                    Έργα
                  </Link>
                  <Link
                    href="/tasks"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                  >
                    Εργασίες
                  </Link>
                  <Link
                    href="/team"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                  >
                    Ομάδα
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user?.emailAddresses[0]?.emailAddress}
                  </span>
                </div>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8',
                      userButtonPopover: 'shadow-lg border',
                      userButtonPopoverCard: 'shadow-none',
                      userButtonPopoverActionButton: 'text-sm',
                      userButtonPopoverActionButtonText: 'text-gray-700',
                      userButtonPopoverFooter: 'hidden'
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">
                    Σύνδεση
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    Εγγραφή
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
