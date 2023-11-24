import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { ImageCropper } from '@/components/common/image-cropper/image-cropper';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusButton } from '@/components/ui/button/atlus-button';

interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AtlusImageCropperModal = ({ onClose, isOpen }: ImageCropperModalProps) => {
  return (
    <AtlusModal
      isOpen={isOpen}
      overlayClassName="z-[2]"
      onRequestClose={onClose}
      modalBodyClassName="!w-[360px] md:!w-[540px] !h-auto"
    >
      <AtlusModalContainer
        className="!h-full !max-h-min !w-auto"
        header={<AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={onClose} />} />}
        footer={
          <AtlusModalFooter className="!justify-center">
            <AtlusButton variant="solid" color="orange" className="atlus-btn-45">
              Apply
            </AtlusButton>
          </AtlusModalFooter>
        }
      >
        <AtlusModalBody className="overflow-x-auto !w-fit">
          <ImageCropper />
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
