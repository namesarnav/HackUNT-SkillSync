export function RecentActivity() {
    const activities = [
      {
        id: 1,
        type: 'completed',
        subject: 'JavaScript Basics',
        time: '2 hours ago',
      },
      {
        id: 2,
        type: 'scheduled',
        subject: 'React Components',
        time: '1 day ago',
      },
      // Add more activities as needed
    ];
    return (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent Activity
            </h3>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {activities.map((activity) => (
                  <li key={activity.id} className="py-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.subject}
                        </p>
                        <p className="text-sm text-gray-500">{activity.type}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    