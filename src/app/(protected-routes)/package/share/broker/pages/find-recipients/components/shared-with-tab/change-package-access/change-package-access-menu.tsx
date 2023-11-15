import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { HiDotsVertical } from 'react-icons/hi';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { PackageAccessMenuItemContent } from '@/app/(protected-routes)/package/share/broker/pages/find-recipients/components/shared-with-tab/change-package-access/package-access-menu-item-content';
import { PackageAccessValue } from '@/models/package-access-value';
import { AtlusMenuDivider } from '@/components/ui/menu/atlus-menu-divider';

interface ChangePackageAccessMenuProps {
  className?: string;
  isLoading: boolean;
  onChangeAccessSelected: (access: PackageAccessValue) => void;
}

export const ChangePackageAccessMenu = ({
  className,
  isLoading,
  onChangeAccessSelected,
}: ChangePackageAccessMenuProps) => {
  return (
    <div className={className}>
      {isLoading ? (
        <AtlusLoadingSpinner color="orange" />
      ) : (
        <AtlusMenu
          menuButton={
            <button>
              <HiDotsVertical />
            </button>
          }
          menuItems={
            <>
              <AtlusMenuItem
                text={
                  <PackageAccessMenuItemContent
                    title="Limited access"
                    description="Can view public documents only"
                  />
                }
                onClick={() => onChangeAccessSelected(PackageAccessValue.LimitedAccess)}
              />
              <AtlusMenuItem
                text={<PackageAccessMenuItemContent title="Full access" description="Can view" />}
                onClick={() => onChangeAccessSelected(PackageAccessValue.FullAccess)}
              />
              <AtlusMenuDivider />
              <AtlusMenuItem
                text={<PackageAccessMenuItemContent title="Remove access" />}
                onClick={() => onChangeAccessSelected(PackageAccessValue.NoAccess)}
              />
            </>
          }
        />
      )}
    </div>
  );
};
