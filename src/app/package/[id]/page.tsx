import { getPackageOnServer } from '@/api/package/get-package-on-server';
import { getDataroomByPackageIdOnServer } from '@/api/dataroom/get-dataroom-by-package-id-on-server';
import { getUserByIdOnServer } from '@/api/user/get-user-by-id-on-server';
import { PackageRightPanel } from '@/app/package/[id]/components/right-panel/package-right-panel';
import { MainPanel } from '@/app/package/[id]/main-panel';
import { SharePackageModal } from '@/app/package/[id]/components/share-package-modal';
import { NoPackagePermission } from '@/app/package/[id]/components/limited-access/request-permission/no-package-permission';
import { getAtlusServerSession } from '@/app/(auth)/session/get-atlus-server-session';

interface PackagePageProps {
  params: {
    id: string;
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const serverSession = await getAtlusServerSession();
  const hasValidSession = !!serverSession;
  const now = Date.now();

  console.log(`[${now}] Loading package id: `, params.id);

  const getDataroomPromise = hasValidSession
    ? getDataroomByPackageIdOnServer(params.id).then(dataroom => {
        console.log(`[${Date.now()}][${Date.now() - now}] Dataroom loaded!`);
        return dataroom;
      })
    : Promise.resolve(undefined);

  const getPackageResponse = await getPackageOnServer(params.id);

  const atlusPackage = getPackageResponse.data.package;
  console.log(`[${Date.now()}][${Date.now() - now}] Package loaded!`, atlusPackage.id);

  const loadUserPromise = hasValidSession
    ? getUserByIdOnServer(atlusPackage.brokerUserId).then(user => {
        console.log(`[${Date.now()}][${Date.now() - now}] User loaded!`);
        return user;
      })
    : Promise.resolve(undefined);

  const promises = await Promise.all([loadUserPromise, getDataroomPromise]);

  const [broker, dataroom] = promises;

  const renderLimitedContent = !hasValidSession && true;

  return (
    <div data-prevent-scoll={renderLimitedContent}>
      <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_380px] gap-[80px] px-[18px] pb-[18px] lg:px-[80px]">
        <MainPanel
          atlusPackage={atlusPackage}
          dataroom={dataroom}
          broker={broker}
          userHasAccessToPackage={true}
        />
        {/* TODO: Remove this check */}
        {broker && (
          <PackageRightPanel
            packageId={atlusPackage.id}
            broker={broker}
            renderLimitedContent={renderLimitedContent}
          />
        )}
      </div>
      {!renderLimitedContent && <SharePackageModal packageId={atlusPackage.id} />}
      {renderLimitedContent && <NoPackagePermission />}
      {/*{renderLimitedContent && <NoPackageSession />}*/}
    </div>
  );
}
