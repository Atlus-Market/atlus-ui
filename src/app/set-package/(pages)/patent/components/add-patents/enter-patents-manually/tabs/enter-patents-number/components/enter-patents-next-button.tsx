'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch } from '@/redux/hooks';
import { setAddPatentsStep } from '@/redux/features/set-package/set-package';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patent/components/add-patents/add-patents-step';
import { useSelector } from 'react-redux';
import { selectIsActiveTabValid } from '@/redux/features/set-package/set-package.selectors';

export const EnterPatentsNextButton = () => {
  const dispatch = useAppDispatch();
  const isActiveFormValid = useSelector(selectIsActiveTabValid);
  return (
    <AtlusButton
      disabled={!isActiveFormValid}
      onClick={() => dispatch(setAddPatentsStep(AddPatentsStep.SelectPatents))}>
      Next
    </AtlusButton>
  );
};
