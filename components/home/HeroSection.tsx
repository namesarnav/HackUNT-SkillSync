import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="relative isolate pt-14">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-purple-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Learn Anything, Teach Everyone
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect with skilled mentors or share your expertise. SkillSync matches you with the perfect learning partner for your journey.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/api/auth/login">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700">
                Start Learning Today
              </button>
            </Link>
            <Link href="/how-it-works" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}