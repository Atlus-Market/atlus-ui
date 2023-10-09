'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useFormContext, useWatch } from 'react-hook-form';

export const SetPatentSaveButton = () => {
  const {
    formState: { isValid },
  } = useFormContext();

  console.log('SetPatent values; ', useWatch());

  return (
    <AtlusButton disabled={!isValid} type="submit">
      Save
    </AtlusButton>
  );
};
