import BrokerDashboard from '@/app/dashboard/(broker)/broker-dashboard';
import { redirect, RedirectType } from 'next/navigation';
import { isCurrentUserBroker } from '@/app/(auth)/session/is-current-user-broker';

export default async function DashboardPage() {
  const isBrokerUser = await isCurrentUserBroker();

  if (isBrokerUser) {
    return <BrokerDashboard />;
  }

  redirect('/dashboard/shared', RedirectType.replace);
  return null;
}
