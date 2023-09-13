import { ReactNode } from 'react';
import Header from '@/components/common/header';
import { LayoutStructure } from '@/app/set-package/components/layout-structure';
import { Sidebar } from '@/app/set-package/components/sidebar/sidebar';
import { PackageStateHandler } from '@/app/set-package/components/package-state-handler';

export default function SetPackageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <PackageStateHandler>
        <LayoutStructure sideBarChildren={<Sidebar />}>{children}</LayoutStructure>
      </PackageStateHandler>
    </>
  );
}
