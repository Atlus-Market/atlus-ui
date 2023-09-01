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
import { AnyAction } from 'redux';
import { RootState } from '@/redux/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Package } from '@/models/package';
import { useRouter } from 'next/navigation';
import { SetPackageDocuments } from '@/constants/routes';

export const SavePackageButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isPersistingPackage = useAppSelector(selectIsPersistingPackage);
  const isPackageValid = useAppSelector(selectIsPackageValid);

  return (
    <AtlusButton
      onClick={async () => {
        const res = await (dispatch as ThunkDispatch<RootState, void, AnyAction>)(persistPackage());
        // @ts-ignore
        const packageRes = res.payload.package as Package;
        // @ts-ignore
        const hasCreatedPackage = res.payload.createdPackage as boolean;

        if (packageRes) {
          showSuccessNotification({ text: 'Package saved successfully!' });
          dispatch(setActivePackage(packageRes));
          if (hasCreatedPackage) {
            router.push(SetPackageDocuments);
          }
        }
      }}
      isLoading={isPersistingPackage}
      disabled={!isPackageValid}>
      Save
    </AtlusButton>
  );
};
