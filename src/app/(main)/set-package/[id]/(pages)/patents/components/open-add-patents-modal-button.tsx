'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useShowAddPatentsModal } from '@/app/(main)/set-package/[id]/(pages)/patents/hooks/use-show-add-patents-modal';

export const OpenAddPatentsModalButton = () => {
  const { showAddPatentsModal } = useShowAddPatentsModal();

  return (
    <AtlusButton variant="solid" color="orange" onClick={showAddPatentsModal}>
      Add patents
    </AtlusButton>
  );
};
