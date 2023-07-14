'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch } from '@/redux/hooks';
import { setAddPatentsStep } from '@/redux/features/set-package/set-package';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';

export const EnterPatentsNextButton = () => {
  const dispatch = useAppDispatch();
  return (
    <AtlusButton
      onClick={() => dispatch(setAddPatentsStep(AddPatentsStep.SelectPatents))}
    >Next
    </AtlusButton>
  );
};
