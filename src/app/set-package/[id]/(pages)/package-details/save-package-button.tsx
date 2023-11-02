'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppSelector } from '@/redux/hooks';
import { selectIsPersistingPackage } from '@/redux/features/set-package/selectors/set-package.selectors';
import { useFormContext } from 'react-hook-form';
import { ExtendedPackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/package-details-form';
import {
  selectIsValidatingTitle,
  selectIsValidTitle,
} from '@/redux/features/set-package/selectors/package-details.selectors';

export const SavePackageButton = () => {
  const {
    formState: { isValid, errors },
  } = useFormContext<ExtendedPackageDetailsForm>();
  const isPersistingPackage = useAppSelector(selectIsPersistingPackage);
  const isValidTitle = useAppSelector(selectIsValidTitle);
  const isValidatingTitle = useAppSelector(selectIsValidatingTitle);

  console.log('isFormValid: ', isValid);
  console.log('isValidatingTitle: ', isValidatingTitle);
  console.log('isValidTitle: ', isValidTitle);
  console.log('formErrors: ', errors);

  return (
    <AtlusButton type="submit" isLoading={isPersistingPackage}>
      Save
    </AtlusButton>
  );
};
