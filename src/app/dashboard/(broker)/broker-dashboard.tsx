import { getUserPackagesOnServer } from '@/api/package/get-user-packages-on-server';
import { getCurrentUserOnServer } from '@/api/user/get-current-user-on-server';
import { CreatePackageButton } from '@/app/dashboard/(broker)/components/create-package-button';
import dynamic from 'next/dynamic';

const BrokerWelcome = dynamic(() =>
  import('./components/broker-welcome').then(mod => mod.BrokerWelcome)
);

export const BrokerDashboard = async () => {
  const user = await getCurrentUserOnServer();
  const packages = await getUserPackagesOnServer(user.id);
  // console.log(packages);

  if (packages.length !== 0) {
    return <BrokerWelcome user={user} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="text-dark-grey text-sm md:text-18 font-geologica">Your packages</span>
        <CreatePackageButton />
      </div>
    </div>
  );
};

export default BrokerDashboard;
