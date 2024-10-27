import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { TeachingSessionDetails } from '@/components/teaching/TeachingSessionDetails';
import { SessionChat } from '@/components/shared/SessionChat';
import { SessionNotes } from '@/components/shared/SessionNotes';
import { SessionResources } from '@/components/shared/SessionResources';

interface SessionPageProps {
  params: {
    sessionId: string;
  };
}

export default async function TeachingSessionPage({ params }: SessionPageProps) {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  const sessionData = {
    id: params.sessionId,
    student: {
      name: 'Alice Johnson',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      level: 'Intermediate'
    },
    subject: 'React Hooks and Context API',
    startTime: '2024-10-26T14:00:00Z',
    duration: '60',
    status: 'scheduled',
    zoomLink: 'https://zoom.us/j/example',
    price: 50,
  };

  return (
    <div className="space-y-6">
      <TeachingSessionDetails session={sessionData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SessionChat sessionId={params.sessionId} role="teacher" />
          <SessionNotes sessionId={params.sessionId} />
        </div>
        <div>
          <SessionResources sessionId={params.sessionId} />
        </div>
      </div>
    </div>
  );
}
