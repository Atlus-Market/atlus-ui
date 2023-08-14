'use client';

import { useAppDispatch } from '@/redux/hooks';
import { hideAddPatentsModal } from '@/redux/features/set-package/set-package';
import {
  AtlusCloseModalButton
} from '@/components/ui/modal/atlus-close-modal-button';

export const CloseAddPatentsModalButton = () => {
  const dispatch = useAppDispatch();
  return (
    <AtlusCloseModalButton
      onClick={() => dispatch(hideAddPatentsModal())}
    />
  );
};
