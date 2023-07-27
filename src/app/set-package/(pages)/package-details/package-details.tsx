'use client';

import {
  IPackageDetailsForm,
  PackageDetailsForm
} from '@/app/set-package/(pages)/package-details/package-details-form';

export const PackageDetails = () => {
  const onSubmit = (formValues: IPackageDetailsForm) => {
    console.log('formValues: ', formValues);
  };

  return (
    <PackageDetailsForm onSubmit={onSubmit} />
  );
};
