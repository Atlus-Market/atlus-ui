'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch } from '@/redux/hooks';
import { hideAddPatentsModal, setPackagePatents } from '@/redux/features/set-package/set-package';

export const SelectPatentsNextButton = () => {
  const dispatch = useAppDispatch();
  return (
    <AtlusButton onClick={() => {
      dispatch(setPackagePatents());
      dispatch(hideAddPatentsModal());
    }}>
      Add to package
    </AtlusButton>
  );
};
