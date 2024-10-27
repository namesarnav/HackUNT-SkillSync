export function SavedCourses() {
    const savedCourses = [
      {
        id: 1,
        title: 'Advanced React Patterns',
        teacher: 'John Doe',
        duration: '8 hours',
        price: 199,
      },
      {
        id: 2,
        title: 'Node.js Microservices',
        teacher: 'Jane Smith',
        duration: '6 hours',
        price: 149,
      },
    ];
  
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Saved Courses</h2>
        <div className="space-y-4">
          {savedCourses.map((course) => (
            <div
              key={course.id}
              className="border border-gray-200 rounded-lg p-4 space-y-2"
            >
              <h3 className="text-sm font-medium text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-500">by {course.teacher}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{course.duration}</span>
                <span>${course.price}</span>
              </div>
              <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }