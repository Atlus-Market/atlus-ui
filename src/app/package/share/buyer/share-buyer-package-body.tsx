import { useSharePackageBrokerVisibility } from '@/app/package/share/broker/use-share-package-broker-visibility';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { SharePackageFooter } from '@/app/package/share/broker/components/commom/share-package-footer';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { ShareBuyerPackageButton } from '@/app/package/share/buyer/components/share-buyer-package-button';
import { ShareBuyerPackageForm } from '@/app/package/share/buyer/components/share-buyer-package-form';
import { ShareBuyerPackageFormFields } from '@/app/package/share/buyer/components/share-buyer-package-form-fields';

export const ShareBuyerPackageBody = () => {
  const { hideSharePackageBroker } = useSharePackageBrokerVisibility();

  return (
    <ShareBuyerPackageForm>
      <AtlusModalContainer
        header={
          <AtlusModalHeader
            rightContent={<AtlusCloseModalButton onClick={hideSharePackageBroker} />}
          >
            <AtlusModalTitle text="Share package" />
          </AtlusModalHeader>
        }
        footer={
          <AtlusModalFooter className="bg-lightest-grey">
            <SharePackageFooter>
              <ShareBuyerPackageButton />
            </SharePackageFooter>
          </AtlusModalFooter>
        }
      >
        <AtlusModalBody className="md:!w-[540px] !py-0 !px-0">
          <ShareBuyerPackageFormFields />
        </AtlusModalBody>
      </AtlusModalContainer>
    </ShareBuyerPackageForm>
  );
};
