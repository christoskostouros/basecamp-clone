import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-2xl font-bold text-gray-900">Basecamp Clone</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost">Σύνδεση</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Δωρεάν Δοκιμή</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Διαχείριση έργων</span>{' '}
                  <span className="block text-yellow-400 xl:inline">δεν πρέπει να είναι δύσκολη</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Υπάρχουν πολλοί τρόποι για να διαχειριστείτε έργα. Και πολλά λογισμικά που υπόσχονται να βοηθήσουν.
                  Πιθανώς έχετε δοκιμάσει κάποια. Ωστόσο, είστε εδώ.
                </p>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  <strong>Δυστυχώς, τα περισσότερα συστήματα διαχείρισης έργων είναι είτε συντριπτικά, ανεπαρκή,
                  περίπλοκα ή χαοτικά.</strong>
                </p>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Όχι η πλατφόρμα μας. Είναι αναζωογονητικά απλή, με 21 χρόνια εμπειρίας πίσω της.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/sign-up">
                      <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                        Δοκιμάστε Δωρεάν
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="#features">
                      <Button variant="outline" size="lg" className="w-full">
                        Δείτε τις Λειτουργίες
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://ext.same-assets.com/1310434852/2084086308.png"
            alt="Project management illustration"
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-yellow-600 font-semibold tracking-wide uppercase">Λειτουργίες</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Όλα όσα χρειάζεστε σε ένα μέρος
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Το σύστημά μας φέρνει μαζί όλα όσα χρειάζεστε για να ολοκληρώσετε τη δουλειά σας.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-400 text-black">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Διαχείριση Έργων</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Τα έργα κρατούν τα πάντα και όλους μαζί σε ένα τακτοποιημένο, προβλέψιμα δομημένο μέρος.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-400 text-black">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Διαχείριση Εργασιών</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Λίστες εργασιών, αναθέσεις και προθεσμίες που κρατούν όλους συντονισμένους.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-400 text-black">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Συνεργασία Ομάδας</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Συζητήσεις, σχόλια και ανταλλαγή αρχείων για απρόσκοπτη συνεργασία.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-400 text-black">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Αναφορές & Αναλυτικά</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Βλέπετε την πρόοδο με σαφήνεια και κρατάτε όλους υπεύθυνους.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-400 text-black">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Παρακολούθηση Χρόνου</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Καταγράψτε τον χρόνο που ξοδεύετε σε κάθε εργασία για καλύτερο σχεδιασμό.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-400 text-black">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Πύλη Πελατών</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Κρατήστε τους πελάτες ενημερωμένους χωρίς να τους κουράσετε με λεπτομέρειες.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-400">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
            <span className="block">Έτοιμοι να ξεκινήσετε;</span>
            <span className="block">Δοκιμάστε δωρεάν σήμερα.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-900">
            Δεν χρειάζεται πιστωτική κάρτα. Πλήρης πρόσβαση για 30 ημέρες.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="mt-8 bg-black hover:bg-gray-800 text-white font-semibold">
              Ξεκινήστε τη Δωρεάν Δοκιμή
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-gray-400 text-sm">
              Εμπνευσμένο από το Basecamp - Δημιουργήθηκε για εκπαιδευτικούς σκοπούς
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 Basecamp Clone. Όλα τα δικαιώματα κατοχυρωμένα.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
