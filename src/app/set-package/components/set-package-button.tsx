'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { persistPackage } from '@/redux/features/set-package/thunks/set-package.thunks';
import {
  selectIsPersistingPackage
} from '@/redux/features/set-package/selectors/set-package.selectors';

export const SetPackageButton = () => {
  const dispatch = useAppDispatch();
  const isPersistingPackage = useAppSelector(selectIsPersistingPackage);
  return (
    <AtlusButton
      onClick={() => dispatch(persistPackage())}
      isLoading={isPersistingPackage}
    >Save</AtlusButton>
  );
};
