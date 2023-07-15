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

export const EnterPatentsNumber = () => {
  return (
    <div className='w-[650px]'>
      <AtlusModalHeader rightContent={<CloseModalButton />} className='mb-6'>
        <AtlusModalTitle text='Enter patent numbers' />
      </AtlusModalHeader>
      <AtlusModalBody className="min-h-[450px]">
        <EnterPatentsNumberBody />
      </AtlusModalBody>
      <AtlusModalFooter>
        <EnterPatentsNextButton />
      </AtlusModalFooter>
    </div>
  );
};