'use client';

import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { DataImageURL } from '@/types';
import { useUploadUserCompanyLogo } from '@/hooks/data/use-upload-user-company-logo';
import { dataImageURLToFile } from '@/utils/file';
import { generateID } from '@/utils/id';

interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataImageURL: DataImageURL;
  onLogoUploaded: () => void;
}

export const UploadCompanyLogoModal = ({
  onClose,
  isOpen,
  dataImageURL,
  onLogoUploaded,
}: ImageCropperModalProps) => {
  const { isLoading, mutateAsync } = useUploadUserCompanyLogo();
  return (
    <AtlusModal isOpen={isOpen} overlayClassName="z-[2]" onRequestClose={onClose}>
      <AtlusModalContainer
        header={<AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={onClose} />} />}
        footer={
          <AtlusModalFooter className="!justify-center">
            <AtlusButton
              variant="solid"
              color="orange"
              className="atlus-btn-45"
              onClick={async () => {
                const fileName = `${generateID()}.png`;
                const companyLogoFile = await dataImageURLToFile(dataImageURL, fileName);
                await mutateAsync(companyLogoFile);
                onLogoUploaded();
              }}
              isLoading={isLoading}
            >
              Apply
            </AtlusButton>
          </AtlusModalFooter>
        }
      >
        <AtlusModalBody className="overflow-x-auto !w-full !flex !justify-center">
          <img src={dataImageURL} className="max-w-[250px] md:max-w-[300px]" />
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
