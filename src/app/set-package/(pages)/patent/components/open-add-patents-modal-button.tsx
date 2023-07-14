'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch } from '@/redux/hooks';
import { showSetPackageModal } from '@/redux/features/set-package/set-package';

export const OpenAddPatentsModalButton = () => {
  const dispatch = useAppDispatch();
  const showAddPatentsModal = () => dispatch(showSetPackageModal());

  return (
    <AtlusButton variant='solid' onClick={showAddPatentsModal}>Add patents</AtlusButton>
  );
};
