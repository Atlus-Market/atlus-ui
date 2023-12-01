'use client';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { HiDotsVertical } from 'react-icons/hi';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useDownloadPackagePatents } from '@/hooks/data/use-download-package-patents';
import { DashboardMenuSpinner } from '@/app/(main)/dashboard/components/dashboard-menu-spinner';
import { useSharePackage } from '@/app/(main)/package/share/hooks/use-share-package';
import { BasePackage } from '@/api/package/search/search-packages';

interface SearchPackageMenuProps {
  basePackage: BasePackage;
}

const shareMenuOptionValue = 'share';

export const SearchPackageMenu = ({ basePackage }: SearchPackageMenuProps) => {
  const { sharePackage } = useSharePackage({ basePackage: basePackage });
  const { id: packageId } = basePackage;
  const { downloadPackagePatents, isDownloadingPackagePatents } =
    useDownloadPackagePatents(packageId);

  if (isDownloadingPackagePatents) {
    return <DashboardMenuSpinner />;
  }

  return (
    <AtlusMenu
      menuButton={
        <AtlusButton
          iconOnlyIcon={<HiDotsVertical />}
          variant="icon-only"
          color="grey"
          className="atlus-btn-20"
          onClick={e => {
            // Stop propagation up so navigation to view package
            // is not triggered.
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      }
      onItemClick={e => {
        e.stopPropagation = true;
        e.syntheticEvent.stopPropagation();

        if (e.value === shareMenuOptionValue) {
          e.syntheticEvent.preventDefault();
          sharePackage();
        }
      }}
      menuItems={
        <>
          <AtlusMenuItem value={shareMenuOptionValue} text="Share" />
          <AtlusMenuItem text="Download CSV" onClick={downloadPackagePatents} />
        </>
      }
    />
  );
};
