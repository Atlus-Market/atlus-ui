'use client';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { HiDotsVertical } from 'react-icons/hi';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useDownloadPackagePatents } from '@/hooks/data/use-download-package-patents';
import { DashboardMenuSpinner } from '@/app/(protected-routes)/dashboard/components/dashboard-menu-spinner';
import { useNotInterestedInPackage } from '@/hooks/data/use-not-interested-inpackage-action';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { useSharePackage } from '@/app/(protected-routes)/package/share/hooks/use-share-package';
import { BuyerPackageData } from '@/api/package/access/get-shared-packages-on-server';

interface BuyerPackageMenuProps {
  buyerPackage: BuyerPackageData;
}

const shareMenuOptionValue = 'share';

export const BuyerPackageMenu = ({ buyerPackage }: BuyerPackageMenuProps) => {
  const { isOn, setOn, setOff } = useToggleState(false);
  const { sharePackage } = useSharePackage({ atlusPackage: buyerPackage });
  const { id: packageId } = buyerPackage;
  const { downloadPackagePatents, isDownloadingPackagePatents } =
    useDownloadPackagePatents(packageId);

  const { setNotInterestedInPackage, isLoading } = useNotInterestedInPackage({ packageId });

  if (isDownloadingPackagePatents || isLoading) {
    return <DashboardMenuSpinner />;
  }

  return (
    <>
      <AtlusAlertModal
        isOpen={isOn}
        title="Not interested?"
        text="This package will be removed from your dashboard."
        mainButton={{
          text: 'Delete',
          onClick: () => {
            setOff();
            setNotInterestedInPackage();
          },
        }}
        secondaryButton={{
          text: 'Cancel',
          onClick: setOff,
        }}
      />

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
            <AtlusMenuItem text="Not interested" onClick={setOn} />
          </>
        }
      />
    </>
  );
};
