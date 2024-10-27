import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { UpcomingSessions } from '@/components/dashboard/UpcomingSessions';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingSessions />
        <RecentActivity />
      </div>
    </div>
  );
}
