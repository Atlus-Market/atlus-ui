'use client';

import { ShareBrokerPackage } from '@/app/package/share/broker/share-broker-package';
import { useSharePackageVisibility } from '@/app/package/share/components/use-share-package-visibility';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';
import { ShareBuyerPackage } from '@/app/package/share/buyer/share-buyer-package';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';

interface SharePackageProps {
  packageId: string;
  isPrivatePackage: boolean;
}

export const SharePackageModal = ({ packageId, isPrivatePackage }: SharePackageProps) => {
  const { data: user } = useAtlusUser();
  const { isSharePackageBrokerOpen, hideSharePackageBroker } = useSharePackageVisibility();

  if (!user) {
    return null;
  }

  if (user.broker) {
    return <ShareBrokerPackage packageId={packageId} isShowingModal={isSharePackageBrokerOpen} />;
  }

  if (isPrivatePackage) {
    return (
      <AtlusAlertModal
        isOpen={isSharePackageBrokerOpen}
        title="Alert"
        text="This is a private package and can only be shared by the owner"
        mainButton={{
          text: 'Close',
          onClick: hideSharePackageBroker,
        }}
      />
    );
  }

  return <ShareBuyerPackage packageId={packageId} isShowingModal={isSharePackageBrokerOpen} />;
};
