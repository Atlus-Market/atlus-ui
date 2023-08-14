'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import {
  useShowAddPatentsModal
} from '@/app/set-package/(pages)/patents/hooks/use-show-add-patents-modal';

export const OpenAddPatentsModalButton = () => {
  const { showAddPatentsModal } = useShowAddPatentsModal();

  return (
    <AtlusButton variant='solid' onClick={showAddPatentsModal}>Add patents</AtlusButton>
  );
};
