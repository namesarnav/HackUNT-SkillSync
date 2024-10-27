export function PendingRequests() {
  const requests = [
    {
      id: 1,
      student: "Alice Johnson",
      subject: "React Basics",
      duration: "1 hour",
      time: "Tomorrow at 2 PM",
      status: "pending",
    },
    {
      id: 2,
      student: "Bob Smith",
      subject: "JavaScript Advanced",
      duration: "2 hours",
      time: "Friday at 10 AM",
      status: "pending",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Pending Requests
      </h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="border border-gray-200 rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {request.student}
                </h3>
                <p className="text-sm text-gray-500">{request.subject}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
            <div className="text-sm text-gray-500">
              <p>{request.duration}</p>
              <p>{request.time}</p>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
                Accept
              </button>
              <button className="flex-1 bg-white text-gray-700 px-3 py-1 rounded-md text-sm border border-gray-300 hover:bg-gray-50">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
