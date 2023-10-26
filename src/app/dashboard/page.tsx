import { ListClientSession } from '@/app/dashboard/components/list-client-session';
import { PackagesListProvider } from '@/app/dashboard/packages/packages-list-provider';
import { PackagesList } from '@/app/dashboard/packages/packages-list';
import Link from 'next/link';
import { SetNewPackageUrl } from '@/constants/routes';
import { AtlusButton } from '@/components/ui/button/atlus-button';

export default async function DashboardPage() {
  return (
    <div className="p-4">
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

      <ListClientSession />
    </div>
  );
}
