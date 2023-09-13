'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useFormContext } from 'react-hook-form';

export const AddContactSaveButton = () => {
  const {
    formState: { isValid, isSubmitting },
  } = useFormContext();
  return (
    <AtlusButton disabled={!isValid} type="submit" isLoading={isSubmitting}>
      Save
    </AtlusButton>
  );
};
