'use client';

import Link from 'next/link';

export function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              SkillSync
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className="text-gray-600 hover:text-gray-900">
              Explore Skills
            </Link>
            <Link href="/teachers" className="text-gray-600 hover:text-gray-900">
              Find Teachers
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
              How It Works
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Dashboard
                </button>
              </Link>
            ) : (
              <>
                <Link href="/api/auth/login" className="text-gray-600 hover:text-gray-900">
                  Log in
                </Link>
                <Link href="/api/auth/login">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}