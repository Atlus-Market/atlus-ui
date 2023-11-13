import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { SharePackageFooter } from '@/app/package/share/broker/components/commom/share-package-footer';
import { SharePackageFindRecipientsNextButton } from '@/app/package/share/broker/pages/find-recipients/components/share-package-find-recipients-next-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';

export const ShareBuyerPackageBody = () => {
  const { hideSharePackageBroker } = useSharePackageBrokerVisibility();

  return (
    <AtlusModalContainer
      header={
        <AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={hideSharePackageBroker} />}>
          <AtlusModalTitle text="Share package" />
        </AtlusModalHeader>
      }
      footer={
        <AtlusModalFooter className="bg-lightest-grey">
          <SharePackageFooter>
            <SharePackageFindRecipientsNextButton />
          </SharePackageFooter>
        </AtlusModalFooter>
      }
    >
      <AtlusModalBody className="md:!w-[540px] !py-0 !px-0">
        <div>Share buyer modal</div>
      </AtlusModalBody>
    </AtlusModalContainer>
  );
};
