import { ReactNode } from 'react';
import { PackageLoader } from '@/app/(main)/set-package/components/package-loader';
import { MinimumScreenSize } from '@/components/common/minimum-screen-size';
import { DesktopOnlyPlaceholder } from '@/components/common/desktop-only-placeholder';
import { Sidebar } from '@/app/(main)/set-package/components/sidebar/sidebar';

export default function SetPackageLayout({ children }: { children: ReactNode }) {
  return (
    <MinimumScreenSize minBreakpointKey="md" noContentChildren={<DesktopOnlyPlaceholder />}>
      <div className="grid grid-cols-[240px,auto] bg-white">
        <div>
          <div className="max-w-[240px] overflow-hidden fixed">
            <Sidebar />
          </div>
        </div>
        <PackageLoader>
          <div>{children}</div>
        </PackageLoader>
      </div>
    </MinimumScreenSize>
  );
}
