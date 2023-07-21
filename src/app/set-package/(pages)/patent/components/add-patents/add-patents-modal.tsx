'use client';

import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { useSelector } from 'react-redux';
import { selectSetPackageState } from '@/redux/features/set-package/set-package.selectors';
import {
  EnterPatentsNumber
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/enter-patents-number';
import {
  SelectPatents
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/select-patents';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';
import { useAppDispatch } from '@/redux/hooks';
import { reset } from '@/redux/features/set-package/set-package';

export const AddPatentsModal = () => {
  const dispatch = useAppDispatch();
  const { addPatents } = useSelector(selectSetPackageState);
  const { isSetPackageModalOpen, currentStep } = addPatents;

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
    <AtlusModal
      isOpen={isSetPackageModalOpen}
      onAfterClose={() => dispatch(reset())}
      modalBodyClassName="max-h-[80%]"
    >
      {step}
    </AtlusModal>
  );
};
