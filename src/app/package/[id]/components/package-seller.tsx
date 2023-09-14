import { Package } from '@/models/package';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';

interface PackageSellerProps {
  atlusPackage: Package;
}

export const PackageSeller = ({ atlusPackage }: PackageSellerProps) => {
  return (
    <div>
      <AtlusTitle
        text="Seller"
        className="!text-[13px] md:!text-sm text-dark-grey mb-2 md:mb-[11px]"
      />
      Seller logo
    </div>
  );
};
