'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useFormContext } from 'react-hook-form';

interface SetPatentSaveButtonProps {
  onClick?: () => void;
}

export const SetPatentSaveButton = (props: SetPatentSaveButtonProps) => {
  const formContext = useFormContext();
  const { formState: { isValid, isSubmitting } } = formContext;

  return (
    <AtlusButton
      disabled={!isValid}
      onClick={props?.onClick}>
      Save
    </AtlusButton>
  );
};
