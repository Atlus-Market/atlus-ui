import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import {
  CloseModalButton
} from '@/app/set-package/(pages)/patent/components/add-patents/close-modal-button';
import {
  EnterPatentsNextButton
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-next-button';
import {
  EnterPatentsNumberBody
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/enter-patents-number-body';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';

export const EnterPatentsNumber = () => {
  return (
    <AtlusModalContainer
      header={
        <AtlusModalHeader rightContent={<CloseModalButton />}>
          <AtlusModalTitle text='Enter patent numbers' />
        </AtlusModalHeader>
      }
      footer={
        <AtlusModalFooter>
          <EnterPatentsNextButton />
        </AtlusModalFooter>
      }>
      <AtlusModalBody className='w-[650px] !py-0'>
        <EnterPatentsNumberBody />
      </AtlusModalBody>
    </AtlusModalContainer>
  );
};
