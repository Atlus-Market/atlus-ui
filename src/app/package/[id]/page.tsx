import { getPackageOnServer } from '@/api/package/get-package-on-server';
import { getDataroomByPackageIdOnServer } from '@/api/dataroom/get-dataroom-by-package-id-on-server';
import { getUserByIdOnServer } from '@/api/user/get-user-by-id-on-server';
import { PackageRightPanel } from '@/app/package/[id]/components/right-panel/package-right-panel';
import { MainPanel } from '@/app/package/[id]/main-panel'; // export const dynamic = 'force-dynamic';

interface PackagePageProps {
  params: {
    id: string;
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  console.log('View package page params: ', params);

  const getDataroomPromise = getDataroomByPackageIdOnServer(params.id);
  const getPackageResponse = await getPackageOnServer(params.id);

  const atlusPackage = getPackageResponse.package;
  console.log('package: ', atlusPackage);

  const promises = await Promise.all([
    getUserByIdOnServer(atlusPackage.brokerUserId),
    getDataroomPromise,
  ]);

  const [broker, dataroom] = promises;
  console.log('broker: ', broker);
  console.log('dataroom: ', dataroom);

  return (
    <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_380px] gap-[80px] px-[18px] pb-[18px] lg:px-[80px]">
      <MainPanel atlusPackage={atlusPackage} dataroom={dataroom} broker={broker} />
      <div className="hidden lg:block">
        <PackageRightPanel packageId={atlusPackage.id} broker={broker} />
      </div>
    </div>
  );
}
