import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import {
  CloseModalButton
} from '@/app/set-package/(pages)/patent/components/add-patents/close-modal-button';
import {
  EnterPatentsNextButton
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-number/components/enter-patents-next-button';
import {
  AddPatentTabSelector
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-number/components/section/add-patent-tab-selector';
import {
  EnterPatentsIds
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-number/components/enter-patents-ids/enter-patents-ids';

export const EnterPatentsNumber = () => {
  return (
    <div className='w-[650px]'>
      <AtlusModalHeader rightContent={<CloseModalButton />} className='mb-6'>
        <AtlusModalTitle text='Enter patent numbers' />
      </AtlusModalHeader>
      <AtlusModalBody>
        <AddPatentTabSelector />
        <EnterPatentsIds />
      </AtlusModalBody>
      <AtlusModalFooter className="mt-[200px]">
        <EnterPatentsNextButton />
      </AtlusModalFooter>
    </div>
  );
};
