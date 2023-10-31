import { PackageRightPanel } from '@/app/package/[id]/components/right-panel/package-right-panel';
import { MainPanel } from '@/app/package/[id]/main-panel';
import { SharePackageModal } from '@/app/package/[id]/components/share-package-modal';
import { getAtlusServerSession } from '@/app/(auth)/session/get-atlus-server-session';
import { NoPackagePermission } from '@/app/package/[id]/components/limited-access/request-permission/no-package-permission';
import { loadPackageViewData } from '@/app/package/[id]/load-package-view-data';
import { NoPackageSession } from '@/app/package/[id]/components/limited-access/no-session/no-package-session';

export interface PackagePageProps {
  params: {
    id: string;
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  console.log(`--------------------- Rendering packageId ${params.id} ---------------------`);
  const serverSession = await getAtlusServerSession();
  const hasValidSession = !!serverSession;

  const {
    package: atlusPackage,
    broker,
    dataroom,
    userHasAccessToPackage,
    isLimitedUser,
  } = await loadPackageViewData(params.id);

  return (
    <div data-prevent-scoll={isLimitedUser}>
      <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_380px] gap-[80px]">
        <MainPanel
          atlusPackage={atlusPackage}
          dataroom={dataroom}
          broker={broker}
          renderLimitedContent={isLimitedUser}
        />
        {broker && (
          <PackageRightPanel
            packageId={atlusPackage.id}
            broker={broker}
            renderLimitedContent={isLimitedUser}
          />
        )}
      </div>
      {!isLimitedUser && <SharePackageModal packageId={atlusPackage.id} />}
      {hasValidSession && !userHasAccessToPackage && <NoPackagePermission />}
      {!hasValidSession && <NoPackageSession />}
    </div>
  );
}
