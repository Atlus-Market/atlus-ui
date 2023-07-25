'use client';

import { HiOutlineX } from 'react-icons/hi';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch } from '@/redux/hooks';
import { hideAddPatentsModal } from '@/redux/features/set-package/set-package';

export const CloseModalButton = () => {
  const dispatch = useAppDispatch();
  return (
    <AtlusButton
      onClick={() => dispatch(hideAddPatentsModal())}
      variant='clear'>
      <HiOutlineX size={30} />
    </AtlusButton>
  );
};
