export function LearningProgress() {
    const skills = [
      {
        name: 'JavaScript',
        progress: 75,
        level: 'Intermediate',
        hoursSpent: 24,
      },
      {
        name: 'React',
        progress: 45,
        level: 'Beginner',
        hoursSpent: 12,
      },
      {
        name: 'Node.js',
        progress: 30,
        level: 'Beginner',
        hoursSpent: 8,
      },
    ];
  
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Learning Progress</h2>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-500">{skill.level}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {skill.hoursSpent} hours
                </span>
              </div>
              <div className="relative">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                  <div
                    style={{ width: `${skill.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }