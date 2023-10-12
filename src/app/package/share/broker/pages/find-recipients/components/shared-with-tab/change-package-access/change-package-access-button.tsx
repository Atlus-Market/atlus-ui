import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiDotsVertical } from 'react-icons/hi';
import { PackageAccessDropdown } from '@/app/package/share/broker/pages/find-recipients/components/shared-with-tab/change-package-access/package-access-dropdown';
import { PackageAccessValue } from '@/models/package-access-value';

interface ChangePackageAccessButtonProps {
  packageAccessValue: PackageAccessValue;
}

export const ChangePackageAccessButton = ({
  packageAccessValue,
}: ChangePackageAccessButtonProps) => {
  return (
    <>
      <PackageAccessDropdown packageAccessValue={packageAccessValue} className="hidden md:block" />
      <AtlusButton variant="clear" className="block md:hidden">
        <HiDotsVertical />
      </AtlusButton>
    </>
  );
};
