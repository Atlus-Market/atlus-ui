import { ListClientSession } from '@/app/dashboard/components/list-client-session';
import { PackagesListProvider } from '@/app/dashboard/packages/packages-list-provider';
import { PackagesList } from '@/app/dashboard/packages/packages-list';
import Link from 'next/link';
import { SetPackagePatent } from '@/constants/routes';
import { AtlusButton } from '@/components/ui/button/atlus-button';

export default async function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Atlus Dashboard</h1>

      <div className="my-6">
        <Link href={`/set-package/new/patents`} className="text-orange underline">
          <AtlusButton size="small">Create new package</AtlusButton>
        </Link>
      </div>
      {/*<TestComponentsHelper />*/}

      <PackagesListProvider>
        <PackagesList />
      </PackagesListProvider>

      <ListClientSession />
    </div>
  );
}
