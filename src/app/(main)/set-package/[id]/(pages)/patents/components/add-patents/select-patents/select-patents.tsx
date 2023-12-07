import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { BackButtonModal } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/back-button-modal';
import { AddPatentsStep } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/add-patents-step';
import { PatentsTable } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/patents-table';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { SelectedPatents } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/selected-patents';
import { CloseAddPatentsModalButton } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/close-add-patents-modal-button';
import { SelectPatentsNextButton } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/select-patents/select-patents-next-button';
import { SelectPatentSetPatentHandler } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/select-patent-set-patent-handler';
import { useSelector } from 'react-redux';
import { selectTableSelectedPatentIds } from '@/redux/features/set-package/selectors/add-patents.selectors';
import clsx from 'clsx';

export const SelectPatents = () => {
  const selectedPatentIds = useSelector(selectTableSelectedPatentIds);
  const hasSelectedPatents = selectedPatentIds.length > 0;

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
        <AtlusModalFooter className={clsx(hasSelectedPatents ? 'justify-between' : 'justify-end')}>
          <SelectedPatents />
          <SelectPatentsNextButton />
        </AtlusModalFooter>
      }
    >
      <AtlusModalBody className="!w-[1240px] bg-[#FCFCFC] !py-0">
        <PatentsTable />
        <SelectPatentSetPatentHandler />
      </AtlusModalBody>
    </AtlusModalContainer>
  );
};
