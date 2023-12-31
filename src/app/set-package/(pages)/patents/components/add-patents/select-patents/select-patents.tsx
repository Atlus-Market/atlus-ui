import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { BackButtonModal } from '@/app/set-package/(pages)/patents/components/add-patents/back-button-modal';
import { AddPatentsStep } from '@/app/set-package/(pages)/patents/components/add-patents/add-patents-step';
import { PatentsTable } from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/patents-table';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { SelectedPatents } from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/selected-patents';
import { CloseAddPatentsModalButton } from '@/app/set-package/(pages)/patents/components/add-patents/close-add-patents-modal-button';
import { SelectPatentsNextButton } from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/select-patents-next-button';
import { SelectPatentSetPatentHandler } from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/select-patent-set-patent-handler';

export const SelectPatents = () => {
  return (
    <AtlusModalContainer
      header={
        <AtlusModalHeader
          leftContent={<BackButtonModal step={AddPatentsStep.EnterPatentsNumber} />}
          rightContent={<CloseAddPatentsModalButton />}
        >
          <AtlusModalTitle text="Select Patents" />
        </AtlusModalHeader>
      }
      footer={
        <AtlusModalFooter>
          <SelectedPatents />
          <SelectPatentsNextButton />
        </AtlusModalFooter>
      }
    >
      <AtlusModalBody className="w-[1240px] bg-[#FCFCFC] !py-0">
        <PatentsTable />
        <SelectPatentSetPatentHandler />
      </AtlusModalBody>
    </AtlusModalContainer>
  );
};
