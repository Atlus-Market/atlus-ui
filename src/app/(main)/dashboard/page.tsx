import BrokerDashboard from '@/app/(main)/dashboard/(broker)/broker-dashboard';
import { redirect, RedirectType } from 'next/navigation';
import { isCurrentUserBroker } from '@/app/(auth)/session/is-current-user-broker';
import { BuyerDashboardShared } from '@/constants/routes';

export default async function DashboardPage() {
  const isBrokerUser = await isCurrentUserBroker();

  if (isBrokerUser) {
    return <BrokerDashboard />;
  }

  redirect(BuyerDashboardShared, RedirectType.replace);
  return null;
}
