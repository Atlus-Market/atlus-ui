import { ReactNode } from 'react';
import Header from '@/components/common/header';
import { LayoutStructure } from '@/app/set-package/components/layout-structure';
import { Sidebar } from '@/app/set-package/components/sidebar/sidebar';
import { PackageLoader } from '@/app/set-package/components/package-loader';

export default function SetPackageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <PackageLoader>
        <LayoutStructure sideBarChildren={<Sidebar />}>{children}</LayoutStructure>
      </PackageLoader>
    </>
  );
}
