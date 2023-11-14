'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiShare } from 'react-icons/hi2';
import { useSharePackageVisibility } from '@/app/package/share/components/use-share-package-visibility';

export const SharePackageButton = () => {
  const { showSharePackageBroker } = useSharePackageVisibility();

  return (
    <AtlusButton
      variant="clear"
      color="dark-grey"
      className="atlus-btn-36 md:atlus-btn-40"
      onClick={showSharePackageBroker}
      leftIcon={<HiShare />}
    >
      <span className="hidden lg:inline-block">Share</span>
    </AtlusButton>
  );
};
