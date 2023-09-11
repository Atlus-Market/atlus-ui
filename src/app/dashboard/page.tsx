import { ListClientSession } from '@/app/dashboard/components/list-client-session';
import { PackagesListProvider } from '@/app/dashboard/packages/packages-list-provider';
import { PackagesList } from '@/app/dashboard/packages/packages-list';
import Link from 'next/link';
import { SetPackagePatent } from '@/constants/routes';

export default async function DashboardPage() {
  return (
    <div className="p-16">
      <h1 className="text-3xl mb-4">Atlus Dashboard</h1>

      <div className="my-6">
        <Link href={SetPackagePatent} className="text-orange underline">
          Create new package
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
