import { LearningProgress } from '@/components/learning/LearningProgress';
import { RecommendedTeachers } from '@/components/learning/RecommendedTeachers';
import { SavedCourses } from '@/components/learning/SavedCourses';

export default function LearningPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Learning Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Find Teachers
        </button>
      </div>
      <LearningProgress />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecommendedTeachers />
        </div>
        <div>
          <SavedCourses />
        </div>
      </div>
    </div>
  );
}
