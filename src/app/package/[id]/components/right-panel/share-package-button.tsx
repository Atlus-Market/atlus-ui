'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiShare } from 'react-icons/hi2';
import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';

export const SharePackageButton = () => {
  const { showSharePackageBroker } = useSharePackageBrokerVisibility();

  return (
    <AtlusButton variant="clear" onClick={showSharePackageBroker}>
      <HiShare className="mr-[10px] text-xl" />{' '}
      <span className="hidden lg:inline-block">Share</span>
    </AtlusButton>
  );
};
