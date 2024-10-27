export function RecommendedTeachers() {
  const teachers = [
    {
      id: 1,
      name: "John Doe",
      expertise: ["JavaScript", "React", "Node.js"],
      rating: 4.9,
      reviews: 128,
      hourlyRate: 50,
      availability: "Available today",
    },
    {
      id: 2,
      name: "Jane Smith",
      expertise: ["Python", "Machine Learning", "Data Science"],
      rating: 4.8,
      reviews: 96,
      hourlyRate: 65,
      availability: "Next available tomorrow",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          Recommended Teachers
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-500">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {teacher.name}
                  </h3>
                  <div className="mt-1 flex items-center">
                    <span className="text-sm text-yellow-500">★</span>
                    <span className="ml-1 text-sm text-gray-500">
                      {teacher.rating} ({teacher.reviews} reviews)
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {teacher.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${teacher.hourlyRate}/hr
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {teacher.availability}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Book Session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
