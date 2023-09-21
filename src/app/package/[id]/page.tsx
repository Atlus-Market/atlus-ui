import { getPackageOnServer } from '@/api/package/get-package-on-server';
import { PackageHeader } from '@/app/package/[id]/components/package-header';
import { PackageDivider } from '@/app/package/[id]/components/package-divider';
import { PackageGeneralInfo } from '@/app/package/[id]/components/general-info/package-general-info';
import { PackageDescription } from '@/app/package/[id]/components/package-description';
import { PackageIndustries } from '@/app/package/[id]/components/package-industries';
import { PackageKeywords } from '@/app/package/[id]/components/package-keyword';
import { PackageSeller } from '@/app/package/[id]/components/package-seller';
import { PackagePatents } from '@/app/package/[id]/components/package-patents/package-patents';
import { getDataroomByPackageIdOnServer } from '@/api/dataroom/get-dataroom-by-package-id-on-server';
import { PackageDocuments } from '@/app/package/[id]/components/package-documents/package-documents'; // export const dynamic = 'force-dynamic';

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

  return (
    <div>
      <PackageHeader atlusPackage={atlusPackage} />
      <PackageDivider />
      <PackageGeneralInfo atlusPackage={atlusPackage} dataroom={dataroom} />
      <PackageDivider />
      <PackageDescription description={atlusPackage.description} />
      <PackageDivider className="bg-transparent !mt-0" />
      <PackageIndustries atlusPackage={atlusPackage} />
      <PackageDivider className="bg-transparent !mt-0" />
      <PackageKeywords atlusPackage={atlusPackage} />
      <PackageDivider className="bg-transparent !mt-0" />
      <PackageSeller atlusPackage={atlusPackage} />
      <PackageDivider />
      <PackagePatents atlusPackage={atlusPackage} />
      <PackageDivider />
      <PackageDocuments dataroom={dataroom} />
      <PackageDivider />
    </div>
  );
}
