import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import {
  AtlusCloseModalButton
} from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import {
  AddContactSaveButton
} from '@/app/set-package/(pages)/package-details/contacts/add-contact/add-contact-save-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';

interface AddContactModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const AddContactModal = ({ isOpen, onClose }: AddContactModalProps) => {
  return (
    <AtlusModal
      isOpen={isOpen}
      overlayClassName='z-[2]'
      modalBodyClassName='max-h-[80%]'>
      <AtlusModalContainer
        header={
          <AtlusModalHeader leftContent={<AtlusCloseModalButton onClick={onClose} />}>
            <AtlusModalTitle text='Add new contact' />
          </AtlusModalHeader>
        }
        footer={
          <AtlusModalFooter className='!justify-center'>
            <AddContactSaveButton />
          </AtlusModalFooter>
        }>
        <AtlusModalBody className='w-[650px] !py-0'>
          body
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
