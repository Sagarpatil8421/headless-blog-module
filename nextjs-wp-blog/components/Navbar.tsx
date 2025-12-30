import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-gray-900">
              Headless Blog
            </Link>
          </div>

          <nav aria-label="Main navigation" className="mt-3 md:mt-0">
            <div className="flex flex-col md:flex-row items-center md:space-x-6 gap-2 md:gap-0 text-sm">
              <Link href="/blogs" className="text-gray-700 hover:text-gray-900">
                Blogs
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
