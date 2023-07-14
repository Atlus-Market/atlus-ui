import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import {
  CloseModalButton
} from '@/app/set-package/(pages)/patent/components/add-patents/close-modal-button';
import {
  EnterPatentsNextButton
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-number/enter-patents-next-button';

export const EnterPatentsNumber = () => {
  return (
    <>
      <AtlusModalHeader rightContent={<CloseModalButton />}>
        <AtlusModalTitle text='Enter patent numbers' />
      </AtlusModalHeader>
      <AtlusModalBody className='w-[730px]'>
        <label>data</label>
        <input />
      </AtlusModalBody>
      <AtlusModalFooter>
        <EnterPatentsNextButton />
      </AtlusModalFooter>
    </>
  );
};