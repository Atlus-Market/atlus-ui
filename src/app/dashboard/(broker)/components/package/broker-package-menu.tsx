'use client';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { HiDotsVertical } from 'react-icons/hi';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { SetPackagePatent } from '@/constants/routes';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import {
  setSharePackageId,
  showSharePackageModal,
} from '@/redux/features/share-package/share-package';
import { useDeletePackageAction } from '@/hooks/data/use-delete-package-action';
import { DashboardMenuSpinner } from '@/app/dashboard/components/dashboard-menu-spinner';

interface BrokerPackageMenuProps {
  packageId: string;
}

const shareMenuOptionValue = 'share';

export const BrokerPackageMenu = ({ packageId }: BrokerPackageMenuProps) => {
  const dispatch = useDispatch();
  const { deletePackage, isDeletingPackage } = useDeletePackageAction({ packageId });

  if (isDeletingPackage) {
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
          dispatch(setSharePackageId({ packageId }));
          dispatch(showSharePackageModal());
        }
      }}
      menuItems={
        <>
          <AtlusMenuItem value={shareMenuOptionValue} text="Share" />
          <Link href={SetPackagePatent(packageId)}>
            <AtlusMenuItem text="Edit" />
          </Link>
          <AtlusMenuItem text="Delete" onClick={deletePackage} />
        </>
      }
    />
  );
};
