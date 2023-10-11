'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiShare } from 'react-icons/hi2';
import { ShareBrokerPackage } from '@/app/package/share/broker/share-broker-package';
import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';

interface SharePackageProps {
  packageId: string;
}

export const SharePackage = ({ packageId }: SharePackageProps) => {
  const { isSharePackageBrokerOpen, showSharePackageBroker, hideSharePackageBroker } =
    useSharePackageBrokerVisibility();

  return (
    <div>
      <AtlusButton variant="clear" onClick={showSharePackageBroker}>
        <HiShare className="mr-[10px]" /> Share
      </AtlusButton>
      <ShareBrokerPackage
        packageId={packageId}
        isShowingModal={isSharePackageBrokerOpen}
        closeModal={hideSharePackageBroker}
      />
    </div>
  );
};
