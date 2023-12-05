'use client';

import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModal } from '@/components/ui/modal/atlus-modal';

import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { Patent } from '@/models/patent';
import { SetPatentForm } from '@/app/(main)/set-package/[id]/(pages)/patents/components/set-patent-modal/set-patent-form';
import { SetPatentSaveButton } from '@/app/(main)/set-package/[id]/(pages)/patents/components/set-patent-modal/set-patent-save-button';
import { SetPatentFormFields } from '@/app/(main)/set-package/[id]/(pages)/patents/components/set-patent-modal/set-patent-form-fields';

interface SetPatentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  editingPatent?: Patent;
  onPatentAdded: (patent: Patent) => void;
  allowEditPublicationNumber?: boolean;
}

export const SetPatentModal = ({
  isOpen,
  closeModal,
  editingPatent,
  onPatentAdded,
  allowEditPublicationNumber,
}: SetPatentModalProps) => {
  console.log('editingPatent: ', editingPatent);
  return (
    <AtlusModal isOpen={isOpen} onRequestClose={closeModal}>
      <SetPatentForm initialValues={editingPatent} onSubmit={patent => onPatentAdded(patent)}>
        <AtlusModalContainer
          header={
            <AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={closeModal} />}>
              <AtlusModalTitle text="Add patent details" />
            </AtlusModalHeader>
          }
          footer={
            <AtlusModalFooter>
              <SetPatentSaveButton />
            </AtlusModalFooter>
          }
        >
          <AtlusModalBody>
            <SetPatentFormFields allowEditPublicationNumber={allowEditPublicationNumber} />
          </AtlusModalBody>
        </AtlusModalContainer>
      </SetPatentForm>
    </AtlusModal>
  );
};
