'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useFormContext } from 'react-hook-form';

interface AddContactSaveButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

export const AddContactSaveButton = ({ disabled, onClick }: AddContactSaveButtonProps) => {
  const formContext = useFormContext();
  const { formState: { isValid, isSubmitting } } = formContext;
  return (
    <AtlusButton disabled={!isValid} onClick={onClick} isLoading={isSubmitting}>
      Save
    </AtlusButton>
  );
};
