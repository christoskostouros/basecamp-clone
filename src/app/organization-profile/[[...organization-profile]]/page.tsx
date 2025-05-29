import { OrganizationProfile } from '@clerk/nextjs'

export default function OrganizationProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Διαχείριση Οργανισμού
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Διαχειριστείτε τις ρυθμίσεις και τα μέλη του οργανισμού σας
          </p>
        </div>
        <div className="flex justify-center">
          <OrganizationProfile 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-yellow-600 hover:bg-yellow-700 text-sm normal-case',
                card: 'shadow-lg',
                navbar: 'bg-white border-b border-gray-200',
                navbarButton: 'text-gray-700 hover:text-gray-900',
                navbarButtonActive: 'text-yellow-600 border-b-2 border-yellow-600'
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}