'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch } from '@/redux/hooks';

export const SelectPatentsNextButton = () => {
  const dispatch = useAppDispatch();
  return (
    <AtlusButton>Add to package
    </AtlusButton>
  );
};
