'use client';

import dynamic from 'next/dynamic';
import { useSharePackageVisibility } from '@/app/package/share/hooks/use-share-package-visibility';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';
import { AtlusSplashLoader } from '@/components/ui/splash-loader/atlus-splash-loader';
import { useSelector } from 'react-redux';
import { selectIsPrivatePackage } from '@/redux/features/share-package/selectors/share-package.selectors';

const ShareBrokerPackage = dynamic(
  () =>
    import('@/app/package/share/broker/share-broker-package').then(mod => mod.ShareBrokerPackage),
  {
    loading: () => <AtlusSplashLoader />,
    ssr: false,
  }
);

const ShareBuyerPackage = dynamic(
  () => import('@/app/package/share/buyer/share-buyer-package').then(mod => mod.ShareBuyerPackage),
  {
    loading: () => <AtlusSplashLoader />,
    ssr: false,
  }
);

const AtlusAlertModal = dynamic(
  () =>
    import('@/components/ui/modal/confirmation/atlus-alert-modal').then(async mod => {
      return mod.AtlusAlertModal;
    }),
  {
    loading: () => <AtlusSplashLoader />,
    ssr: false,
  }
);

interface SharePackageModalProps {
  useSimpleShareModal?: boolean; // Buyer Modal
}

/**
 * To use it, call dispatch(setPackageData)
 * @constructor
 */
export const SharePackageModal = ({ useSimpleShareModal = false }: SharePackageModalProps) => {
  const { data: user } = useAtlusUser();
  const isPrivatePackage = useSelector(selectIsPrivatePackage);
  const { isSharePackageOpen, hideSharePackageModal } = useSharePackageVisibility();

  if (!user) {
    return null;
  }

  const isBuyerUser = !user.broker;

  if (useSimpleShareModal || isBuyerUser) {
    if (isPrivatePackage) {
      return (
        <AtlusAlertModal
          isOpen={isSharePackageOpen}
          title="Alert"
          text="This is a private package and can only be shared by the owner"
          mainButton={{
            text: 'Close',
            onClick: hideSharePackageModal,
          }}
        />
      );
    }
    return <ShareBuyerPackage />;
  }

  // is broker user
  return <ShareBrokerPackage />;
};
