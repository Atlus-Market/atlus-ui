import { BuyerLayoutTabs } from '@/app/dashboard/(buyer)/buyer-layout-tabs';
import { BuyerDashboardShared } from '@/constants/routes';
import { getCurrentUserOnServer } from '@/api/user/get-current-user-on-server';
import { getUserPackagesOnServer } from '@/api/package/get-user-packages-on-server';
import { NoData } from '@/app/dashboard/components/no-data';
import OnlineEducationSVG from '@/public/assets/images/online_education.svg';

export default async function DashboardSharedPage() {
  const user = await getCurrentUserOnServer();
  const packages = await getUserPackagesOnServer(user.id);
  console.log('Shared with you packages: ', packages);

  const hasPackages = packages.length > 0;
  return (
    <div>
      <BuyerLayoutTabs activePathname={BuyerDashboardShared} />

      {!hasPackages && (
        <NoData
          image={OnlineEducationSVG}
          subtitle={
            <span className="text-dark-grey">Packages shared with you will appear here</span>
          }
        />
      )}
    </div>
  );
}
