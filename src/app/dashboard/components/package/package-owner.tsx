import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { UserInfoFullName } from '@/components/common/user-info/user-info-full-name';
import { UserInfoCompanyName } from '@/components/common/user-info/user-info-company-name';
import { UserInfo } from '@/components/common/user-info/user-info';
import { BasePackage } from '@/api/package/search/search-packages';

interface BuyerPackageOwnerProps {
  basePackage: BasePackage;
}

export const PackageOwner = ({ basePackage }: BuyerPackageOwnerProps) => {
  return (
    <UserInfo
      avatar={<AtlusAvatar data={{ firstName: basePackage.brokerName }} className="w-36" />}
      fullName={
        <UserInfoFullName fullName={basePackage.brokerName} className="!text-13 md:!text-sm" />
      }
      companyName={
        <UserInfoCompanyName
          companyName={basePackage.brokerCompany}
          className="!text-11 md:!text-xs"
        />
      }
    />
  );
};
