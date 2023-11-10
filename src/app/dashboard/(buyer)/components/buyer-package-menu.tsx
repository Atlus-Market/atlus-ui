'use client';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { HiDotsVertical } from 'react-icons/hi';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useDownloadPackagePatents } from '@/hooks/data/use-download-package-patents';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';

interface BuyerPackageMenuProps {
  packageId: string;
}

const shareMenuOptionValue = 'share';

export const BuyerPackageMenu = ({ packageId }: BuyerPackageMenuProps) => {
  // const dispatch = useDispatch();

  const { downloadPackagePatents, isDownloadingPackagePatents } =
    useDownloadPackagePatents(packageId);

  if (isDownloadingPackagePatents) {
    return <AtlusLoadingSpinner size={20} color="orange" />;
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
        }
      }}
      menuItems={
        <>
          <AtlusMenuItem value={shareMenuOptionValue} text="Share" />
          <AtlusMenuItem text="Download CSV" onClick={downloadPackagePatents} />
          <AtlusMenuItem text="Not interested" />
        </>
      }
    />
  );
};
