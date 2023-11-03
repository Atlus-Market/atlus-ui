'use client';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { HiDotsVertical } from 'react-icons/hi';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { PackageAccessMenuItemContent } from '@/app/package/share/broker/pages/find-recipients/components/shared-with-tab/change-package-access/package-access-menu-item-content';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { SetPackagePatent } from '@/constants/routes';
import Link from 'next/link';

interface BrokerPackageMenuProps {
  packageId: string;
}

export const BrokerPackageMenu = ({ packageId }: BrokerPackageMenuProps) => {
  return (
    <AtlusMenu
      menuButton={
        <AtlusButton
          iconOnlyIcon={<HiDotsVertical />}
          variant="icon-only"
          color="grey"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      }
      menuItems={
        <>
          <AtlusMenuItem text={<PackageAccessMenuItemContent title="Share" />} />
          <Link href={SetPackagePatent(packageId)}>
            <AtlusMenuItem text={<PackageAccessMenuItemContent title="Edit" />} />
          </Link>
          <AtlusMenuItem text={<PackageAccessMenuItemContent title="Delete" />} />
        </>
      }
    />
  );
};
