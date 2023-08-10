'use client';

import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import {
  SetPatentForm
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/set-patent-modal/set-patent-form';
import {
  SetPatentFormFields
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/set-patent-modal/set-patent-form-fields';
import {
  SetPatentSaveButton
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/set-patent-modal/set-patent-save-button';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { Patent } from '@/models/patent';
import { useAppDispatch } from '@/redux/hooks';
import { updatePatent } from '@/redux/features/set-package/set-package';

interface SetPatentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  editingPatent?: Patent;
}

export const SetPatentModal = ({ isOpen, closeModal, editingPatent }: SetPatentModalProps) => {
  const dispatch = useAppDispatch();
  return (
    <AtlusModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      modalBodyClassName='max-h-[80%]'>
      <SetPatentForm
        initialValues={editingPatent}
        onSubmit={(patent) => {
          dispatch(updatePatent({ patent }));
          closeModal();
        }}>
        <AtlusModalContainer
          header={
            <AtlusModalHeader rightContent={<AtlusCloseModalButton onClick={closeModal} />}>
              <AtlusModalTitle text='Add patent details' />
            </AtlusModalHeader>
          }
          footer={
            <AtlusModalFooter>
              <SetPatentSaveButton />
            </AtlusModalFooter>
          }>
          <AtlusModalBody className='w-[650px] !py-0'>
            <SetPatentFormFields />
          </AtlusModalBody>
        </AtlusModalContainer>
      </SetPatentForm>
    </AtlusModal>
  );
};
