import { TeachingStats } from '@/components/teaching/TeachingStats';
import { AvailabilityCalendar } from '@/components/teaching/AvailabilityCalendar';
import { PendingRequests } from '@/components/teaching/PendingRequests';

export default function TeachingPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Teaching Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add Availability
        </button>
      </div>
      <TeachingStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AvailabilityCalendar />
        </div>
        <div>
          <PendingRequests />
        </div>
      </div>
    </div>
  );
}
