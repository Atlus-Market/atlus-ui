import { getIsBrokerUser } from '@/api/user/get-is-broker-user-on-server';
import BrokerDashboard from '@/app/dashboard/(broker)/broker-dashboard';
import { redirect, RedirectType } from 'next/navigation';

export default async function DashboardPage() {
  console.log('*********************** DASHBOADR PAGE (getting user) ************************');
  const isBrokerUser = await getIsBrokerUser();

  if (isBrokerUser) {
    return <BrokerDashboard />;
  }

  redirect('/dashboard/shared', RedirectType.replace);
  return null;
}
