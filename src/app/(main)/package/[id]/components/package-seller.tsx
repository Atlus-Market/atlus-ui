import Image from 'next/image';

import CompanyLogoSvg from '@/public/assets/images/company-logo.svg';
import { PackageSubSectionTitle } from '@/app/(main)/package/[id]/components/package-sub-section-title';

interface PackageSellerProps {
  companyName: string;
}

export const PackageSeller = ({ companyName }: PackageSellerProps) => {
  return (
    <div>
      <PackageSubSectionTitle title="Seller" />
      <div className="flex items-center gap-3 md:gap-4">
        <Image src={CompanyLogoSvg} alt="Company logo" />
        <span className="text-base md:text-lg">{companyName}</span>
      </div>
    </div>
  );
};
