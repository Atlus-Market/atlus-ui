'use client';

import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patents/components/add-patents/add-patents-step';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiArrowLeft } from 'react-icons/hi2';
import { useAppDispatch } from '@/redux/hooks';
import { setAddPatentsStep } from '@/redux/features/set-package/set-package';

interface BackButtonModalProps {
  step: AddPatentsStep;
}

export const BackButtonModal = ({ step }: BackButtonModalProps) => {
  const dispatch = useAppDispatch();
  return (
    <AtlusButton
      onClick={() => dispatch(setAddPatentsStep(step))}
      variant='clear'
    >
      <HiArrowLeft size={24} />
    </AtlusButton>
  );
};
