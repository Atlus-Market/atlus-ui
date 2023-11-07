'use client';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { HiDotsVertical } from 'react-icons/hi';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusButton } from '@/components/ui/button/atlus-button';

interface BuyerPackageMenuProps {
  packageId: string;
}

const shareMenuOptionValue = 'share';

export const BuyerPackageMenu = ({ packageId }: BuyerPackageMenuProps) => {
  // const dispatch = useDispatch();

  return (
    <AtlusMenu
      menuButton={
        <AtlusButton
          iconOnlyIcon={<HiDotsVertical />}
          variant="icon-only"
          color="grey"
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
          <AtlusMenuItem text="Download CSV" />
          <AtlusMenuItem text="Not interested" />
        </>
      }
    />
  );
};
