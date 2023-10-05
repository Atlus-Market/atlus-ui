'use client';

import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { SharePackageFooter } from '@/app/package/share/broker/components/commom/share-package-footer';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';
import { AtlusModalBackButton } from '@/components/ui/modal/atlus-modal-back-button';
import { useAppDispatch } from '@/redux/hooks';
import { setActivePage } from '@/redux/features/share-package/share-package';
import { SharePackagePage } from '@/app/package/share/broker/components/commom/share-package-page';

export const SendMessagePage = () => {
  const dispatch = useAppDispatch();
  const { hideSharePackageBroker } = useSharePackageBrokerVisibility();
  const goBack = () => dispatch(setActivePage(SharePackagePage.FindRecipients));

  return (
    <AtlusModalContainer
      header={
        <AtlusModalHeader
          leftContent={<AtlusModalBackButton onClick={goBack} />}
          rightContent={<AtlusCloseModalButton onClick={hideSharePackageBroker} />}
        >
          <AtlusModalTitle text="Share package" />
        </AtlusModalHeader>
      }
      footer={
        <AtlusModalFooter className="bg-lightest-grey">
          <SharePackageFooter />
        </AtlusModalFooter>
      }
    >
      <AtlusModalBody className="md:!w-[540px] !py-0 !px-0">
        <div>Send message</div>
      </AtlusModalBody>
    </AtlusModalContainer>
  );
};
