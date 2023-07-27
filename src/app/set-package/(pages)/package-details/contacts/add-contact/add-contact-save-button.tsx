'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';

interface AddContactSaveButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

export const AddContactSaveButton = ({ disabled, onClick }: AddContactSaveButtonProps) => {
  return (
    <AtlusButton disabled={disabled} onClick={onClick}>
      Save
    </AtlusButton>
  );
};
