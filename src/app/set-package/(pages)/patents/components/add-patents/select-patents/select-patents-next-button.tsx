'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch } from '@/redux/hooks';
import { hideAddPatentsModal, setPackagePatents } from '@/redux/features/set-package/set-package';
import { useSelector } from 'react-redux';
import { selectTableSelectedPatentIds } from '@/redux/features/set-package/selectors/add-patents.selectors';

export const SelectPatentsNextButton = () => {
  const dispatch = useAppDispatch();
  const selectedPatentIds = useSelector(selectTableSelectedPatentIds);
  const hasSelectedPatents = selectedPatentIds.length > 0;

  return (
    <AtlusButton
      disabled={!hasSelectedPatents}
      onClick={() => {
        dispatch(setPackagePatents());
        dispatch(hideAddPatentsModal());
      }}
    >
      Add to package
    </AtlusButton>
  );
};
