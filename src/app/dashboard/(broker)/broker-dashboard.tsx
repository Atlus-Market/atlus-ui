import { getUserPackagesOnServer } from '@/api/package/get-user-packages-on-server';
import { getCurrentUserOnServer } from '@/api/user/get-current-user-on-server';
import { CreatePackageButton } from '@/app/dashboard/(broker)/components/create-package-button';
import { BrokerWelcome } from '@/app/dashboard/(broker)/components/broker-welcome';
import { BrokerPackagesList } from '@/app/dashboard/(broker)/components/broker-packages-list';
import { PackagesStats } from '@/app/dashboard/(broker)/components/stats/packages-stats';

export const BrokerDashboard = async () => {
  const user = await getCurrentUserOnServer();
  const packages = await getUserPackagesOnServer(user.id);

  if (packages.length === 0) {
    return <BrokerWelcome user={user} />;
  }

  return (
    <div>
      <PackagesStats />
      <div className="flex justify-between items-center mb-[11px] md:mb-4 mt-6 md:mt-8">
        <span className="text-dark-grey text-sm md:text-18 font-geologica">Your packages</span>
        <CreatePackageButton />
      </div>
      {/*@ts-ignore*/}
      <BrokerPackagesList basePackages={packages} />
    </div>
  );
};

export default BrokerDashboard;
