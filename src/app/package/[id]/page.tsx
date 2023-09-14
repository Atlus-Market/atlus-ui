import { getPackageOnServer } from '@/api/package/get-package-on-server';
import { PackageHeader } from '@/app/package/[id]/components/package-header';
import { PackageDivider } from '@/app/package/[id]/components/package-divider';
import { PackageGeneralInfo } from '@/app/package/[id]/components/general-info/package-general-info';
import { getDataroomOnServer } from '@/api/dataroom/get-dataroom-on-server';
import { PackageDescription } from '@/app/package/[id]/components/package-description';
import { PackageIndustries } from '@/app/package/[id]/components/package-industries';

export const dynamic = 'force-dynamic';

interface PackagePageProps {
  params: {
    id: string;
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  console.log('Page params: ', params);
  const packageResponse = await getPackageOnServer(params.id);
  const atlusPackage = packageResponse.package;
  console.log('Package: ', atlusPackage);

  const dataroom = await getDataroomOnServer(atlusPackage.dataroomId);
  console.log('dataroom: ', dataroom);

  return (
    <div>
      <PackageHeader atlusPackage={atlusPackage} />
      <PackageDivider />
      <PackageGeneralInfo atlusPackage={atlusPackage} dataroom={dataroom} />
      <PackageDivider />
      <PackageDescription description={atlusPackage.description} />
      <PackageIndustries atlusPackage={atlusPackage} />
      <PackageDivider />
    </div>
  );
}
