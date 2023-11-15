import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { UserInfoFullName } from '@/components/common/user-info/user-info-full-name';
import { UserInfoCompanyName } from '@/components/common/user-info/user-info-company-name';
import { UserInfo } from '@/components/common/user-info/user-info';
import { BuyerPackageData } from '@/api/package/access/get-shared-packages-on-server';

interface BuyerPackageOwnerProps {
  buyerPackage: BuyerPackageData;
}

export const BuyerPackageOwner = ({ buyerPackage }: BuyerPackageOwnerProps) => {
  return (
    <UserInfo
      avatar={<AtlusAvatar word={buyerPackage.brokerName} className="w-36" />}
      fullName={
        <UserInfoFullName fullName={buyerPackage.brokerName} className="!text-13 md:!text-sm" />
      }
      companyName={
        <UserInfoCompanyName
          companyName={buyerPackage.brokerCompany}
          className="!text-11 md:!text-xs"
        />
      }
    />
  );
};
