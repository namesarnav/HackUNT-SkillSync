export function FeatureSection() {
    const features = [
      {
        name: 'Verified Skills',
        description: 'Teachers verify their expertise through professional platforms like GitHub and LinkedIn.',
        icon: '⭐',
      },
      {
        name: 'Learn Your Way',
        description: 'Choose between one-on-one sessions or group learning experiences.',
        icon: '📚',
      },
      {
        name: 'Real-time Matching',
        description: 'Our smart algorithm connects you with the perfect learning partner.',
        icon: '🤝',
      },
      {
        name: 'Skill Chains',
        description: 'Learn from others while teaching what you know best.',
        icon: '⚡',
      },
    ];
  
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">
              Learn Faster
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to accelerate your learning
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              SkillSync provides all the tools and connections you need to learn new skills or share your expertise with others.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <span className="text-2xl">{feature.icon}</span>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    );
  }