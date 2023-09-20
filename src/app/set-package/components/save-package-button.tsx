'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { persistPackage } from '@/redux/features/set-package/thunks/set-package.thunk';
import { selectIsPersistingPackage } from '@/redux/features/set-package/selectors/set-package.selectors';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { setActivePackage } from '@/redux/features/set-package/set-package';
import { AnyAction } from 'redux';
import { RootState } from '@/redux/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Package } from '@/models/package';
import { useRouter } from 'next/navigation';
import { SetPackageDocuments } from '@/constants/routes';
import { useFormContext } from 'react-hook-form';
import { IPackageDetailsForm } from '@/app/set-package/(pages)/package-details/package-details-form';
import { selectPackageHasValidPatents } from '@/redux/features/set-package/selectors/package-validility.selectors';
import {
  selectIsValidatingTitle,
  selectIsValidTitle,
} from '@/redux/features/set-package/selectors/package-details.selectors';

export const SavePackageButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    formState: { isValid, errors },
  } = useFormContext<IPackageDetailsForm>();
  const isPersistingPackage = useAppSelector(selectIsPersistingPackage);
  const packageHasValidPatents = useAppSelector(selectPackageHasValidPatents);
  const isValidTitle = useAppSelector(selectIsValidTitle);
  const isValidatingTitle = useAppSelector(selectIsValidatingTitle);

  console.log('isFormValid: ', isValid);
  console.log('isValidatingTitle: ', isValidatingTitle);
  console.log('isValidTitle: ', isValidTitle);
  console.log('formErrors: ', errors);

  const isFormValid = !isValidatingTitle && isValidTitle && isValid;

  return (
    <AtlusButton
      onClick={async () => {
        const res = await (dispatch as ThunkDispatch<RootState, void, AnyAction>)(persistPackage());

        // @ts-ignore
        if (res.error) {
          return;
        }

        showSuccessNotification({ text: 'Package saved successfully!' });

        // @ts-ignore
        const hasCreatedPackage = res.payload.createdPackage as boolean;

        if (hasCreatedPackage) {
          // @ts-ignore
          const packageRes = res.payload.package as Package;
          dispatch(setActivePackage(packageRes));
          router.push(SetPackageDocuments);
        }
      }}
      isLoading={isPersistingPackage}
      disabled={!isFormValid || !packageHasValidPatents}
    >
      Save
    </AtlusButton>
  );
};
