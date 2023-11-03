'use client';

import { useSelector } from 'react-redux';
import { selectSharePackageId } from '@/redux/features/share-package/selectors/share-package.selectors';
import { ShareBrokerPackageModal } from '@/app/package/[id]/components/share-broker-package-modal';

export const BrokerPackageActions = () => {
  const packageId = useSelector(selectSharePackageId);
  return (
    <>
      <ShareBrokerPackageModal packageId={packageId} />
    </>
  );
};
