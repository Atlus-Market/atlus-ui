import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import {
  CloseModalButton
} from '@/app/set-package/(pages)/patent/components/add-patents/close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import {
  SelectPatentsNextButton
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/select-patents-next-button';
import {
  BackButtonModal
} from '@/app/set-package/(pages)/patent/components/add-patents/back-button-modal';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';
import {
  PatentsTable
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';

export const SelectPatents = () => {
  return (
    <>
      <AtlusModalHeader
        leftContent={<BackButtonModal step={AddPatentsStep.EnterPatentsNumber} />}
        rightContent={<CloseModalButton />}>
        <AtlusModalTitle text='Select Patents' />
      </AtlusModalHeader>
      <AtlusModalBody className='w-[1200px]'>
        <PatentsTable />
      </AtlusModalBody>
      <AtlusModalFooter>
        <SelectPatentsNextButton />
      </AtlusModalFooter>
    </>
  );
};
