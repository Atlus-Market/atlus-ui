'use client';

import { SidebarItem } from '@/app/(main)/set-package/components/sidebar/sidebar-item';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { selectPackage } from '@/redux/features/set-package/selectors/set-package.selectors';
import { useSetPackageUrls } from '@/app/(main)/set-package/hooks/use-set-package-urls';

export const Sidebar = () => {
  const pathname = usePathname();
  const activePackage = useAppSelector(selectPackage);
  const setPackageUrls = useSetPackageUrls();

  return (
    <div className="pt-[94px] p-4 [&>*:not(:last-child)]:mb-4 w-full hidden md:block">
      <SidebarItem
        itemNumber={1}
        text="Patents"
        href={setPackageUrls.patents}
        isActive={pathname === setPackageUrls.patents}
      />
      <SidebarItem
        itemNumber={2}
        text="Package details"
        href={setPackageUrls.packageDetails}
        isActive={pathname === setPackageUrls.packageDetails}
      />
      <SidebarItem
        itemNumber={3}
        text="Documents"
        href={setPackageUrls.documents}
        isActive={pathname === setPackageUrls.documents}
        disabled={!activePackage}
      />
    </div>
  );
};
