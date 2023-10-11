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
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setActivePage } from '@/redux/features/share-package/share-package';
import { SharePackagePage } from '@/app/package/share/broker/components/commom/share-package-page';
import { SendMessageBody } from '@/app/package/share/broker/pages/send-message/send-message-body';
import { SharePackageSendMessageSendButton } from '@/app/package/share/broker/pages/send-message/share-package-send-message-send-button';
import { SharePackageSendMessageForm } from '@/app/package/share/broker/pages/send-message/send-message-form';
import { selectSharePackageId } from '@/redux/features/share-package/selectors/share-package.selectors';

export const SendMessagePage = () => {
  const dispatch = useAppDispatch();
  const packageId = useAppSelector(selectSharePackageId);
  const { hideSharePackageBroker } = useSharePackageBrokerVisibility();
  const goBack = () => dispatch(setActivePage(SharePackagePage.FindRecipients));

  return (
    <SharePackageSendMessageForm packageId={packageId} onMessageSent={hideSharePackageBroker}>
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
            <SharePackageFooter>
              <SharePackageSendMessageSendButton />
            </SharePackageFooter>
          </AtlusModalFooter>
        }
      >
        <AtlusModalBody className="md:!w-[540px] !py-0 !px-0">
          <SendMessageBody />
        </AtlusModalBody>
      </AtlusModalContainer>
    </SharePackageSendMessageForm>
  );
};
