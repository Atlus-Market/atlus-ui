'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AddContactFormFields } from '@/app/(main)/set-package/[id]/(pages)/package-details/contacts/add-contact/add-contact-form-fields';
import { Contact } from '@/models/contact';
import { AddContactForm } from '@/app/(main)/set-package/[id]/(pages)/package-details/contacts/add-contact/add-contact-form';
import { AddContactSaveButton } from '@/app/(main)/set-package/[id]/(pages)/package-details/contacts/add-contact/add-contact-save-button';

interface AddContactModalProps {
  isOpen: boolean;
  onClose?: () => void;
  initialValues?: Contact;
  onContactAdded?: (contact: Contact) => void;
}

export const AddContactModal = ({
  isOpen,
  onClose,
  initialValues,
  onContactAdded,
}: AddContactModalProps) => {
  return (
    <AtlusModal isOpen={isOpen} onAfterClose={onClose} overlayClassName="z-[2]">
      <AddContactForm initialValues={initialValues} onContactAdded={onContactAdded}>
        <AtlusModalContainer
          header={
            <AtlusModalHeader leftContent={<AtlusCloseModalButton onClick={onClose} />}>
              <AtlusModalTitle text={`${!initialValues ? 'Add' : 'Edit'} contact`} />
            </AtlusModalHeader>
          }
          footer={
            <AtlusModalFooter className="!justify-center">
              <AddContactSaveButton />
            </AtlusModalFooter>
          }
        >
          <AtlusModalBody>
            <AddContactFormFields />
          </AtlusModalBody>
        </AtlusModalContainer>
      </AddContactForm>
    </AtlusModal>
  );
};
