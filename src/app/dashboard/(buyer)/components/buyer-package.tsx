import { BuyerPackageData } from '@/api/package/access/get-shared-packages-on-server';
import { PackageImage } from '@/app/dashboard/components/package/package-image';
import { PackageTitle } from '@/app/dashboard/components/package/package-title';
import { PackageStatusTag } from '@/app/package/[id]/components/package-status-tag';
import { PackageFamiliesAndDocuments } from '@/app/dashboard/components/package/package-families-and-documents';
import { PackageCardWrapper } from '@/app/dashboard/components/package-card-wrapper';
import { BuyerPackageMenu } from '@/app/dashboard/(buyer)/components/buyer-package-menu';
import { PackageWatchlist } from '@/app/dashboard/components/package/watchlist/package-watchlist';
import { BuyerPackageOwner } from '@/app/dashboard/(buyer)/components/buyer-package-owner';

interface BuyerPackageProps {
  buyerPackage: BuyerPackageData;
}

export const BuyerPackage = ({ buyerPackage }: BuyerPackageProps) => {
  const menu = <BuyerPackageMenu packageId={buyerPackage.id} />;
  const watchList = (
    <PackageWatchlist packageId={buyerPackage.id} isWatched={buyerPackage.is_watched} />
  );
  const packageOwner = <BuyerPackageOwner buyerPackage={buyerPackage} />;
  return (
    <PackageCardWrapper packageId={buyerPackage.id}>
      <div className="flex px-[18px] py-2 md:p-[10px] gap-4 md:gap-6">
        <PackageImage />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-[6px] md:mb-3">
            <PackageTitle title={buyerPackage.title} />
            <div className="hidden md:flex gap-4">
              {watchList}
              {menu}
            </div>
          </div>
          <PackageFamiliesAndDocuments
            documentsCount={buyerPackage.documents_count}
            familiesCount={buyerPackage.families_count}
            className="mb-[10px] md:mb-4"
          />
          <div className="mb-5">
            <PackageStatusTag status={buyerPackage.status} />
          </div>
          <div className="hidden md:block">{packageOwner}</div>
        </div>
      </div>
      <div className="flex md:hidden border-t border-t-lightest-grey py-[10px] px-[18px] justify-between items-center">
        {packageOwner}
        <div className="flex items-center gap-4">
          {watchList}
          {menu}
        </div>
      </div>
    </PackageCardWrapper>
  );
};
