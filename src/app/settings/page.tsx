import { getCurrentUserOnServer } from '@/api/user/get-current-user-on-server';
import { BrokerSettings } from '@/app/settings/components/broker-settings';
import { BuyerSettings } from '@/app/settings/components/buyer/buyer-settings';

export default async function SettingsPage() {
  const user = await getCurrentUserOnServer();

  return (
    <div className="flex justify-center">
      {user.broker ? <BrokerSettings /> : <BuyerSettings />}
    </div>
  );
}
