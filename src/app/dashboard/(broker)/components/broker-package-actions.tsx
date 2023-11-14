'use client';

import { useSelector } from 'react-redux';
import { selectSharePackageId } from '@/redux/features/share-package/selectors/share-package.selectors';
import { SharePackageModal } from '@/app/package/share/share-package-modal';

export const BrokerPackageActions = () => {
  const packageId = useSelector(selectSharePackageId);
  return (
    <>
      <SharePackageModal packageId={packageId} isPrivatePackage={false} />
    </>
  );
};
