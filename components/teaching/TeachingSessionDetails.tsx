'use client';

import { format } from 'date-fns';

interface TeachingSessionDetailsProps {
  session: {
    id: string;
    student: {
      name: string;
      image: string;
      level: string;
    };
    subject: string;
    startTime: string;
    duration: string;
    status: string;
    zoomLink: string;
    price: number;
  };
}

export function TeachingSessionDetails({ session }: TeachingSessionDetailsProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={session.student.image}
              alt={session.student.name}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Session with {session.student.name}
              </h2>
              <p className="text-sm text-gray-500">
                Level: {session.student.level}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              session.status === 'scheduled' ? 'bg-green-100 text-green-800' :
              session.status === 'completed' ? 'bg-gray-100 text-gray-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </span>
            <span className="text-sm text-gray-500">${session.price}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Subject</h3>
            <p className="mt-1 text-sm text-gray-900">{session.subject}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
            <p className="mt-1 text-sm text-gray-900">
              {format(new Date(session.startTime), 'PPp')}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Duration</h3>
            <p className="mt-1 text-sm text-gray-900">{session.duration} minutes</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <a
              href={session.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Join Zoom Meeting
            </a>
          </div>
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Reschedule
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
              Cancel Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}