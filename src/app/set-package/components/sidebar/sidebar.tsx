'use client';

import { SidebarItem } from '@/app/set-package/components/sidebar/sidebar-item';
import { useParams, usePathname } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { selectPackage } from '@/redux/features/set-package/selectors/set-package.selectors';

export const Sidebar = () => {
  const pathname = usePathname();
  const params = useParams();
  const activePackage = useAppSelector(selectPackage);
  const basePath = `/set-package/${params.id}`;
  return (
    <div className="pt-[99px] p-4 [&>*:not(:last-child)]:mb-4">
      <SidebarItem
        itemNumber={1}
        text="Patents"
        href={`${basePath}/patents`}
        isActive={pathname === `${basePath}/patents`}
      />
      <SidebarItem
        itemNumber={2}
        text="Package details"
        href={`${basePath}/package-details`}
        isActive={pathname === `${basePath}/package-details`}
      />
      <SidebarItem
        itemNumber={3}
        text="Documents"
        href={`${basePath}/documents`}
        isActive={pathname === `${basePath}/documents`}
        disabled={!activePackage}
      />
    </div>
  );
};
