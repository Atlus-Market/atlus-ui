'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useFormContext } from 'react-hook-form';

export const SetPatentSaveButton = () => {
  const {
    formState: { isValid },
  } = useFormContext();

  return <AtlusButton type="submit">Save</AtlusButton>;
};
