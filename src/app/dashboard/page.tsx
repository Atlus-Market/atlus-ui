import { PackagesListProvider } from '@/app/dashboard/packages/packages-list-provider';
import { PackagesList } from '@/app/dashboard/packages/packages-list';
import Link from 'next/link';
import { SetNewPackageUrl } from '@/constants/routes';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { getIsBrokerUser } from '@/api/user/get-is-broker-user-on-server';
import BrokerDashboard from '@/app/dashboard/(broker)/broker-dashboard';

export default async function DashboardPage() {
  const isBrokerUser = await getIsBrokerUser();

  // const atlusPackage = await getPackageOnServer('72f8bd14-eb2d-4a26-8a51-5fb0b5301144');

  if (isBrokerUser) {
    return (
      <>
        {/*<div>{atlusPackage.data.package.title}</div>*/}
        <BrokerDashboard />
      </>
    );
  }

  return (
    <div>
      <h1 className="text-3xl mb-4">Atlus Dashboard</h1>

      <div className="my-6">
        <Link href={SetNewPackageUrl} className="text-orange underline">
          <AtlusButton className="atlus-btn-38" variant="solid" color="orange">
            Create new package
          </AtlusButton>
        </Link>
      </div>

      <PackagesListProvider>
        <PackagesList />
      </PackagesListProvider>
    </div>
  );
}
