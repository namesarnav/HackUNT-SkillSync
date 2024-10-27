export function UpcomingSessions() {
    const sessions = [
      {
        id: 1,
        title: 'JavaScript Advanced Concepts',
        teacher: 'John Doe',
        date: 'Tomorrow at 2:00 PM',
        status: 'confirmed',
      },
      {
        id: 2,
        title: 'React Hooks Deep Dive',
        teacher: 'Jane Smith',
        date: 'Friday at 11:00 AM',
        status: 'pending',
      },
      // Add more sessions as needed
    ];
  
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Upcoming Sessions
          </h3>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {sessions.map((session) => (
                <li key={session.id} className="py-5">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session.title}
                      </p>
                      <p className="text-sm text-gray-500">with {session.teacher}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          session.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{session.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }