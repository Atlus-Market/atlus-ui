'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useFormContext } from 'react-hook-form';

interface AddContactSaveButtonProps {
  onClick?: () => void;
}

export const AddContactSaveButton = (props: AddContactSaveButtonProps) => {
  const formContext = useFormContext();
  const { formState: { isValid, isSubmitting } } = formContext;
  return (
    <AtlusButton disabled={!isValid} onClick={props?.onClick} isLoading={isSubmitting}>
      Save
    </AtlusButton>
  );
};
