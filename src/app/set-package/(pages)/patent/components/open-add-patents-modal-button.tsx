'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch } from '@/redux/hooks';
import { showAddPatentsModal } from '@/redux/features/set-package/set-package';

export const OpenAddPatentsModalButton = () => {
  const dispatch = useAppDispatch();

  return (
    <AtlusButton variant='solid' onClick={() => dispatch(showAddPatentsModal())}>Add patents</AtlusButton>
  );
};
