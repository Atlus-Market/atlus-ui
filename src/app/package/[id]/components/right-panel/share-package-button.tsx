'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiShare } from 'react-icons/hi2';
import { Package } from '@/models/package';
import { useSharePackage } from '@/app/package/share/hooks/use-share-package';

interface SharePackageButtonProps {
  atlusPackage: Package;
}

export const SharePackageButton = ({ atlusPackage }: SharePackageButtonProps) => {
  const { sharePackage } = useSharePackage({ atlusPackage });
  return (
    <AtlusButton
      variant="clear"
      color="dark-grey"
      className="atlus-btn-36 md:atlus-btn-40"
      onClick={sharePackage}
      leftIcon={<HiShare />}
    >
      <span className="hidden lg:inline-block">Share</span>
    </AtlusButton>
  );
};
