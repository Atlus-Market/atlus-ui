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
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';

export const SetPackageButton = () => {
  const dispatch = useAppDispatch();
  const isPersistingPackage = useAppSelector(selectIsPersistingPackage);
  const isPackageValid = useAppSelector(selectIsPackageValid);

  return (
    <AtlusButton
      onClick={async () => {
        const res = await dispatch(persistPackage());
        if (res.payload) {
          showSuccessNotification({ text: 'Package created successfully' });
        }
      }}
      isLoading={isPersistingPackage}
      disabled={!isPackageValid}>
      Save
    </AtlusButton>
  );
};
