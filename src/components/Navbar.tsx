import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              FichasFácil
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/login"
              className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="ml-4 bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

