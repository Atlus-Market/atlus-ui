import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { AnyAction } from 'redux';
import { persistPackage } from '@/redux/features/set-package/thunks/set-package.thunk';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { Package } from '@/models/package';
import { setActivePackage } from '@/redux/features/set-package/set-package';
import { SetPackageDocuments } from '@/constants/routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { IPackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/package-details-form';
import { selectPackage } from '@/redux/features/set-package/selectors/set-package.selectors';

export const useSubmitPackageDetailsForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const activePackage = useAppSelector(selectPackage);

  return useCallback(
    async (formValues: IPackageDetailsForm) => {
      let packageId = activePackage?.id;

      console.log('[PackageDetailsForm] submit: ', formValues);

      const res = await (dispatch as ThunkDispatch<RootState, void, AnyAction>)(
        persistPackage(formValues)
      );

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
        await fetch(`/api/package/${packageRes.id}`);
        dispatch(setActivePackage(packageRes));
        router.push(SetPackageDocuments(packageRes.id));
      } else {
        if (packageId) {
          // revalidate
          await fetch(`/api/package/${packageId}`);
        }
      }
    },
    [dispatch, router, activePackage]
  );
};
