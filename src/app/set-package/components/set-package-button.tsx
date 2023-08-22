'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { persistPackage } from '@/redux/features/set-package/thunks/set-package.thunks';
import {
  selectIsPersistingPackage
} from '@/redux/features/set-package/selectors/set-package.selectors';
import {
  selectIsPackageValid
} from '@/redux/features/set-package/selectors/package-validility.selectors';

export const SetPackageButton = () => {
  const dispatch = useAppDispatch();
  const isPersistingPackage = useAppSelector(selectIsPersistingPackage);
  const isPackageValid = useAppSelector(selectIsPackageValid);

  return (
    <AtlusButton
      onClick={() => dispatch(persistPackage())}
      isLoading={isPersistingPackage}
      disabled={!isPackageValid}>
      Save
    </AtlusButton>
  );
};
