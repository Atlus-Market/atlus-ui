'use client';

import { SidebarItem } from '@/app/set-package/components/sidebar/sidebar-item';
import { usePathname } from 'next/navigation';
import {
  SetPackageDocuments,
  SetPackagePackageDetails,
  SetPackagePatent
} from '@/constants/routes';

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className='h-full pt-[99px] p-4 [&>*:not(:last-child)]:mb-4'>
      <SidebarItem
        itemNumber={1}
        text='Patent'
        href={SetPackagePatent}
        isActive={pathname === SetPackagePatent}
      />
      <SidebarItem
        itemNumber={2}
        text='Package details'
        href={SetPackagePackageDetails}
        isActive={pathname === SetPackagePackageDetails}
      />
      <SidebarItem
        itemNumber={3}
        text='Documents'
        href={SetPackageDocuments}
        isActive={pathname === SetPackageDocuments}
      />
    </div>
  );
};
