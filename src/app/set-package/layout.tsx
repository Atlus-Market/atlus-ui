import { ReactNode } from 'react';
import Header from '@/components/common/header/header';
import { Sidebar } from '@/app/set-package/components/sidebar/sidebar';
import { PackageLoader } from '@/app/set-package/components/package-loader';
import { MinimumScreenSize } from '@/components/common/minimum-screen-size';
import { DesktopOnlyPlaceholder } from '@/components/common/desktop-only-placeholder';
import { AtlusLayout } from '@/components/common/layout/atlus-layout';

export default function SetPackageLayout({ children }: { children: ReactNode }) {
  return (
    <MinimumScreenSize
      breakpointKey="md"
      noContentChildren={
        <AtlusLayout header={<Header />} sideBar={null}>
          <DesktopOnlyPlaceholder />
        </AtlusLayout>
      }
    >
      <AtlusLayout header={<Header />} sideBar={<Sidebar />}>
        <PackageLoader>{children}</PackageLoader>
      </AtlusLayout>
    </MinimumScreenSize>
  );
}
