import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import {
  CloseAddPatentsModalButton
} from '@/app/set-package/(pages)/patent/components/add-patents/close-add-patents-modal-button';
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

interface SetPatentModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const SetPatentModal = ({ isOpen }: SetPatentModalProps) => {
  return (
    <AtlusModal
      isOpen={isOpen}
      onAfterClose={() => {
        console.log('Close Modal');
      }}
      modalBodyClassName='max-h-[80%]'>
      <SetPatentForm>
        <AtlusModalContainer
          header={
            <AtlusModalHeader rightContent={<CloseAddPatentsModalButton />}>
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
