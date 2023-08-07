'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import {
  AddContactFormFields
} from '@/app/set-package/(pages)/package-details/contacts/add-contact/add-contact-form-fields';
import { useRef } from 'react';
import { Contact } from '@/models/contact';
import {
  AddContactForm,
  AddContactRefExposedProps
} from '@/app/set-package/(pages)/package-details/contacts/add-contact/add-contact-form';
import {
  AddContactSaveButton
} from '@/app/set-package/(pages)/package-details/contacts/add-contact/add-contact-save-button';

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
                                  onContactAdded
                                }: AddContactModalProps) => {
  const addContactFormRef = useRef<AddContactRefExposedProps | null>(null);

  return (
    <AtlusModal
      isOpen={isOpen}
      onAfterClose={onClose}
      overlayClassName='z-[2]'
      modalBodyClassName='max-h-[80%]'>
      <AddContactForm
        initialValues={initialValues}
        onContactAdded={onContactAdded}
        ref={addContactFormRef}>
        <AtlusModalContainer
          header={
            <AtlusModalHeader leftContent={<AtlusCloseModalButton onClick={onClose} />}>
              <AtlusModalTitle text='Add new contact' />
            </AtlusModalHeader>
          }
          footer={
            <AtlusModalFooter className='!justify-center'>
              <AddContactSaveButton
                onClick={() => {
                  addContactFormRef.current?.submitForm();
                }}
              />
            </AtlusModalFooter>
          }>
          <AtlusModalBody className='w-[650px]'>
            <AddContactFormFields />
          </AtlusModalBody>
        </AtlusModalContainer>
      </AddContactForm>
    </AtlusModal>
  );
};
