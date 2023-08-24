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
import { setActivePackage } from '@/redux/features/set-package/set-package';
import { Package } from '@/models/package';

export const SavePackageButton = () => {
  const dispatch = useAppDispatch();
  const isPersistingPackage = useAppSelector(selectIsPersistingPackage);
  const isPackageValid = useAppSelector(selectIsPackageValid);

  return (
    <AtlusButton
      onClick={async () => {
        const res = await dispatch(persistPackage());
        if (res.payload) {
          showSuccessNotification({ text: 'Package saved successfully!' });
          dispatch(setActivePackage(res.payload as Package));
        }
      }}
      isLoading={isPersistingPackage}
      disabled={!isPackageValid}>
      Save
    </AtlusButton>
  );
};
