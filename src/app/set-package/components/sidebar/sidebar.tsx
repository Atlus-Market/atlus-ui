'use client';

import { SidebarItem } from '@/app/set-package/components/sidebar/sidebar-item';
import { usePathname } from 'next/navigation';
import {
  SetPackageDocuments,
  SetPackagePackageDetails,
  SetPackagePatent
} from '@/constants/routes';
import { useAppSelector } from '@/redux/hooks';
import { selectPackage } from '@/redux/features/set-package/selectors/set-package.selectors';

export const Sidebar = () => {
  const pathname = usePathname();
  const activePackage = useAppSelector(selectPackage);
  return (
    <div className='pt-[99px] p-4 [&>*:not(:last-child)]:mb-4'>
      <SidebarItem
        itemNumber={1}
        text='Patents'
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
        disabled={!activePackage}
      />
    </div>
  );
};
