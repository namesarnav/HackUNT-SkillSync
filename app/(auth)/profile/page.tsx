import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/auth/ProfileForm';

export default async function ProfilePage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your profile and preferences
          </p>
        </div>
        <ProfileForm user={session.user} />
      </div>
    </div>
  );
}