import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { AnyAction } from 'redux';
import { persistPackage } from '@/redux/features/set-package/thunks/set-package.thunk';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { Package } from '@/models/package';
import { setActivePackage } from '@/redux/features/set-package/set-package';
import { SetPackageDocuments } from '@/constants/routes';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { IPackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/package-details-form';

export const useSubmitPackageDetailsForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useCallback(
    async (formValues: IPackageDetailsForm) => {
      console.log('[PackageDetailsForm] submit: ', formValues);

      const res = await (dispatch as ThunkDispatch<RootState, void, AnyAction>)(
        persistPackage(formValues)
      );

      // @ts-ignore
      if (res.error) {
        return;
      }

      // @ts-ignore
      const packageRes = res.payload.package as Package;

      router.refresh();
      showSuccessNotification({ text: 'Package saved successfully!' });

      dispatch(setActivePackage(packageRes));

      // @ts-ignore
      const hasCreatedPackage = res.payload.createdPackage as boolean;
      if (hasCreatedPackage) {
        router.push(SetPackageDocuments(packageRes.id));
      }
    },
    [dispatch, router]
  );
};
