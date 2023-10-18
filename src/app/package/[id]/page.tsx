import { getPackageOnServer } from '@/api/package/get-package-on-server';
import { getDataroomByPackageIdOnServer } from '@/api/dataroom/get-dataroom-by-package-id-on-server';
import { getUserByIdOnServer } from '@/api/user/get-user-by-id-on-server';
import { PackageRightPanel } from '@/app/package/[id]/components/right-panel/package-right-panel';
import { MainPanel } from '@/app/package/[id]/main-panel';
import { SharePackageModal } from '@/app/package/[id]/components/share-package-modal';
import { NoPackagePermissionFooter } from '@/app/package/[id]/components/no-package-permission-footer';

interface PackagePageProps {
  params: {
    id: string;
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const now = Date.now();
  console.log(`[${now}] Loading package id: `, params.id);

  const getDataroomPromise = getDataroomByPackageIdOnServer(params.id).then(dataroom => {
    console.log(`[${Date.now()}][${Date.now() - now}] Dataroom loaded!`);
    return dataroom;
  });
  const getPackageResponse = await getPackageOnServer(params.id);

  const atlusPackage = getPackageResponse.package;
  console.log(`[${Date.now()}][${Date.now() - now}] Package loaded!`, atlusPackage.id);

  const promises = await Promise.all([
    getUserByIdOnServer(atlusPackage.brokerUserId).then(user => {
      console.log(`[${Date.now()}][${Date.now() - now}] User loaded!`, user);
      return user;
    }),
    getDataroomPromise,
  ]);

  const [broker, dataroom] = promises;
  const renderLimitedContent = true;

  return (
    <div className="relative h-full" data-prevent-scoll={renderLimitedContent}>
      <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_380px] gap-[80px] px-[18px] pb-[18px] lg:px-[80px]">
        <MainPanel
          atlusPackage={atlusPackage}
          dataroom={dataroom}
          broker={broker}
          userHasAccessToPackage={true}
        />
        <PackageRightPanel
          packageId={atlusPackage.id}
          broker={broker}
          renderLimitedContent={renderLimitedContent}
        />
      </div>
      {!renderLimitedContent && <SharePackageModal packageId={atlusPackage.id} />}
      {renderLimitedContent && <NoPackagePermissionFooter />}
    </div>
  );
}
