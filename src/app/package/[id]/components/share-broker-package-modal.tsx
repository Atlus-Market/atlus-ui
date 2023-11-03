'use client';

import { ShareBrokerPackage } from '@/app/package/share/broker/share-broker-package';
import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';

interface SharePackageProps {
  packageId: string;
}

export const ShareBrokerPackageModal = ({ packageId }: SharePackageProps) => {
  const { isSharePackageBrokerOpen } = useSharePackageBrokerVisibility();
  return <ShareBrokerPackage packageId={packageId} isShowingModal={isSharePackageBrokerOpen} />;
};
