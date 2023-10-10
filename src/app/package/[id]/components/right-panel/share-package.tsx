'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiShare } from 'react-icons/hi2';
import { ShareBrokerPackage } from '@/app/package/share/broker/share-broker-package';
import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { setSharePackageId } from '@/redux/features/share-package/share-package';

interface SharePackageProps {
  packageId: string;
}

export const SharePackage = ({ packageId }: SharePackageProps) => {
  const dispatch = useAppDispatch();
  const { isSharePackageBrokerOpen, showSharePackageBroker, hideSharePackageBroker } =
    useSharePackageBrokerVisibility();

  useEffect(() => {
    dispatch(setSharePackageId({ packageId }));
  }, [packageId, dispatch]);

  return (
    <div>
      <AtlusButton variant="clear" onClick={showSharePackageBroker}>
        <HiShare className="mr-[10px]" /> Share
      </AtlusButton>
      <ShareBrokerPackage
        isShowingModal={isSharePackageBrokerOpen}
        closeModal={hideSharePackageBroker}
      />
    </div>
  );
};
