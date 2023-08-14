'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch } from '@/redux/hooks';
import { hideAddPatentsModal, setPackagePatents } from '@/redux/features/set-package/set-package';
import {
  useFamilyPatentsHelper
} from '@/app/set-package/(pages)/patents/hooks/use-family-patents-helper';
import { useSelector } from 'react-redux';
import {
  selectSelectedFamilyPatents
} from '@/redux/features/set-package/selectors/add-patents-selectors';

export const SelectPatentsNextButton = () => {
  const dispatch = useAppDispatch();
  const selectedFamilyPatents = useSelector(selectSelectedFamilyPatents);
  const { patentsCount } = useFamilyPatentsHelper(selectedFamilyPatents);
  return (
    <AtlusButton
      disabled={patentsCount === 0}
      onClick={() => {
        dispatch(setPackagePatents());
        dispatch(hideAddPatentsModal());
      }}>
      Add to package
    </AtlusButton>
  );
};
