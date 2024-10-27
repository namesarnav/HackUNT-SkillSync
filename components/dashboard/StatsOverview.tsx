export function StatsOverview() {
    const stats = [
      { name: 'Teaching Hours', value: '24' },
      { name: 'Learning Hours', value: '12' },
      { name: 'Active Sessions', value: '3' },
      { name: 'Skills Learned', value: '5' },
    ];
  
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Overview</h3>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6"
              >
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }