'use client';

import { useSelector } from 'react-redux';
import { selectSharePackageId } from '@/redux/features/share-package/selectors/share-package.selectors';
import { SharePackageModal } from '@/app/package/[id]/components/share-package-modal';

export const BrokerPackageActions = () => {
  const packageId = useSelector(selectSharePackageId);
  return (
    <>
      <SharePackageModal packageId={packageId} />
    </>
  );
};
