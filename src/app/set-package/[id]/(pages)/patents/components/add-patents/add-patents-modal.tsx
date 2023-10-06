'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { useSelector } from 'react-redux';
import { EnterPatentsNumber } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/enter-patents-number';
import { SelectPatents } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/select-patents';
import { AddPatentsStep } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/add-patents-step';
import { useAppDispatch } from '@/redux/hooks';
import { hideAddPatentsModal, resetAddPatents } from '@/redux/features/set-package/set-package';
import { selectSetPackageState } from '@/redux/features/set-package/selectors/set-package.selectors';

export const AddPatentsModal = () => {
  const dispatch = useAppDispatch();
  const { addPatents } = useSelector(selectSetPackageState);
  const { isAddPatentsModalOpen, currentStep } = addPatents;

  let step = null;
  switch (currentStep) {
    case AddPatentsStep.SelectPatents: {
      step = <SelectPatents />;
      break;
    }
    default:
    case AddPatentsStep.EnterPatentsNumber: {
      step = <EnterPatentsNumber />;
      break;
    }
  }

  return (
    <>
      <AtlusModal
        isOpen={isAddPatentsModalOpen}
        onRequestClose={() => dispatch(hideAddPatentsModal())}
        onAfterClose={() => dispatch(resetAddPatents())}
      >
        {step}
      </AtlusModal>
    </>
  );
};
