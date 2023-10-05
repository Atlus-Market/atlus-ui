'use client';

import { AddPatentsStep } from '@/app/set-package/(pages)/patents/components/add-patents/add-patents-step';
import { useAppDispatch } from '@/redux/hooks';
import { setAddPatentsStep } from '@/redux/features/set-package/set-package';
import { AtlusModalBackButton } from '@/components/ui/modal/atlus-modal-back-button';

interface BackButtonModalProps {
  step: AddPatentsStep;
}

export const BackButtonModal = ({ step }: BackButtonModalProps) => {
  const dispatch = useAppDispatch();
  return <AtlusModalBackButton onClick={() => dispatch(setAddPatentsStep(step))} />;
};
