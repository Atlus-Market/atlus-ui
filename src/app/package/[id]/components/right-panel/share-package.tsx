'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiShare } from 'react-icons/hi2';
import { ShareBrokerPackage } from '@/app/package/share/broker/share-broker-package';
import { useToggleState } from '@/hooks/use-toggle-state';

interface SharePackageProps {}

export const SharePackage = ({}: SharePackageProps) => {
  const { isOn: isModalOpen, setOn: setIsModalOpen, setOff: closeModal } = useToggleState(false);

  return (
    <div>
      <AtlusButton variant="clear" onClick={setIsModalOpen}>
        <HiShare className="mr-[10px]" /> Share
      </AtlusButton>
      <ShareBrokerPackage isShowingModal={isModalOpen} closeModal={closeModal} />
    </div>
  );
};
