import { PackageRightPanel } from '@/app/(main)/package/[id]/components/right-panel/package-right-panel';
import { MainPanel } from '@/app/(main)/package/[id]/main-panel';
import { SharePackageModal } from '@/app/(main)/package/share/share-package-modal';
import { getAtlusServerSession } from '@/app/(auth)/session/get-atlus-server-session';
import { NoPackagePermission } from '@/app/(main)/package/[id]/components/limited-access/request-permission/no-package-permission';
import { loadPackageViewData } from '@/app/(main)/package/[id]/load-package-view-data';
import { NoPackageSession } from '@/app/(main)/package/[id]/components/limited-access/no-session/no-package-session';
import { setPackageViewOnServer } from '@/api/package/analytics/set-package-view-on-server';

export interface PackagePageProps {
  params: {
    id: string;
  };
}

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidation-frequency
export const revalidate = 60;

export default async function PackagePage({ params }: PackagePageProps) {
  const packageId = params.id;
  console.log(`--------------------- Rendering packageId ${packageId} ---------------------`);
  const serverSession = await getAtlusServerSession();
  const hasValidSession = !!serverSession;

  const {
    package: atlusPackage,
    broker,
    dataroom,
    userHasAccessToPackage,
    isLimitedUser,
    isActiveUserBroker,
    sepStandards,
  } = await loadPackageViewData(packageId);

  if (!isActiveUserBroker) {
    setPackageViewOnServer(packageId);
  }

  return (
    <div data-prevent-scoll={isLimitedUser}>
      <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_380px] gap-[80px]">
        <MainPanel
          atlusPackage={atlusPackage}
          dataroom={dataroom}
          broker={broker}
          renderLimitedContent={isLimitedUser}
          sepStandards={sepStandards}
        />
        {broker && (
          <PackageRightPanel
            atlusPackage={atlusPackage}
            broker={broker}
            renderLimitedContent={isLimitedUser}
            showEditPackageButton={isActiveUserBroker}
          />
        )}
      </div>
      {!isLimitedUser && <SharePackageModal />}
      {hasValidSession && !userHasAccessToPackage && <NoPackagePermission />}
      {!hasValidSession && <NoPackageSession packageId={atlusPackage.id} />}
    </div>
  );
}
