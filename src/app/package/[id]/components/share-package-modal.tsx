'use client';

import { ShareBrokerPackage } from '@/app/package/share/broker/share-broker-package';
import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';
import { ShareBuyerPackage } from '@/app/package/share/buyer/share-buyer-package';

interface SharePackageProps {
  packageId: string;
}

export const SharePackageModal = ({ packageId }: SharePackageProps) => {
  const { data: user } = useAtlusUser();
  const { isSharePackageBrokerOpen } = useSharePackageBrokerVisibility();

  if (!user) {
    return null;
  }

  if (user.broker) {
    return <ShareBrokerPackage packageId={packageId} isShowingModal={isSharePackageBrokerOpen} />;
  }

  return <ShareBuyerPackage packageId={packageId} isShowingModal={isSharePackageBrokerOpen} />;
};
