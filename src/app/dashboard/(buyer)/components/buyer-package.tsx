import { BuyerPackageData } from '@/api/package/get-shared-packages-on-server';
import { PackageImage } from '@/app/dashboard/components/package/package-image';
import { PackageTitle } from '@/app/dashboard/components/package/package-title';
import { PackageStatusTag } from '@/app/package/[id]/components/package-status-tag';
import { PackageFamiliesAndDocuments } from '@/app/dashboard/components/package/package-families-and-documents';
import { PackageCardWrapper } from '@/app/dashboard/components/package-card-wrapper';
import { BuyerPackageMenu } from '@/app/dashboard/(buyer)/components/buyer-package-menu';

interface BuyerPackageProps {
  buyerPackage: BuyerPackageData;
}

export const BuyerPackage = ({ buyerPackage }: BuyerPackageProps) => {
  const menu = <BuyerPackageMenu packageId={buyerPackage.id} />;
  return (
    <PackageCardWrapper
      packageId={buyerPackage.id}
      className="flex bg-peach px-[18px] py-2 md:p-[10px] gap-4 md:gap-6"
    >
      <PackageImage />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-[6px] md:mb-3">
          <PackageTitle title={buyerPackage.title} />
          <div className="hidden md:flex">{menu}</div>
        </div>
        <PackageFamiliesAndDocuments
          documentsCount={buyerPackage.documents_count}
          familiesCount={buyerPackage.families_count}
          className="mb-[10px] md:mb-4"
        />
        <div>
          <PackageStatusTag status={buyerPackage.status} />
        </div>
      </div>
      {/*<PackageOwner />*/}
    </PackageCardWrapper>
  );
};
