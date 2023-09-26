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

  const packageData = await Promise.all([
    getPackageOnServer(params.id),
    getDataroomByPackageIdOnServer(params.id),
  ]);

  const atlusPackage = packageData[0].package;
  console.log('package: ', atlusPackage);

  const dataroom = packageData[1];
  console.log('dataroom: ', dataroom);

  const broker = await getUserByIdOnServer(atlusPackage.brokerUserId);

  return (
    <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_380px] gap-[80px] px-[18px] pb-[18px] lg:px-[80px]">
      <MainPanel atlusPackage={atlusPackage} dataroom={dataroom} broker={broker} />
      <div className="hidden lg:block">
        <PackageRightPanel broker={broker} />
      </div>
    </div>
  );
}
