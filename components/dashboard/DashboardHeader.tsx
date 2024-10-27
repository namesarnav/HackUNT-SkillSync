'use client';

import { UserProfile } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export function DashboardHeader({ user }: { user: UserProfile }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-2">
                <img
                  src={user.picture || 'https://via.placeholder.com/32'}
                  alt={user.name || 'Profile'}
                  className="h-8 w-8 rounded-full"
                />
                <span className="hidden md:block text-sm text-gray-700">
                  {user.name}
                </span>
              </button>
            </div>
            <Link 
              href="/api/auth/logout"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}