import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import {
  CloseAddPatentsModalButton
} from '@/app/set-package/(pages)/patent/components/add-patents/close-add-patents-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import {
  EnterPatentsNextButton
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-next-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import {
  SetPatentForm
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/set-patent-modal/set-patent-form';
import {
  SetPatentFormFields
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/set-patent-modal/set-patent-form-fields';

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
              <EnterPatentsNextButton />
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
