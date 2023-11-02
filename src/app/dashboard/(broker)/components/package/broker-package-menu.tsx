'use client';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { HiDotsVertical } from 'react-icons/hi';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { PackageAccessMenuItemContent } from '@/app/package/share/broker/pages/find-recipients/components/shared-with-tab/change-package-access/package-access-menu-item-content';
import { AtlusButton } from '@/components/ui/button/atlus-button';

export const BrokerPackageMenu = () => {
  return (
    <AtlusMenu
      menuButton={
        <AtlusButton iconOnlyIcon={<HiDotsVertical />} variant="icon-only" color="grey" />
      }
      menuItems={
        <>
          <AtlusMenuItem text={<PackageAccessMenuItemContent title="Share" />} />
          <AtlusMenuItem text={<PackageAccessMenuItemContent title="Edit" />} />
          <AtlusMenuItem text={<PackageAccessMenuItemContent title="Delete" />} />
        </>
      }
    />
  );
};
