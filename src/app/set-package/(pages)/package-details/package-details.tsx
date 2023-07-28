'use client';

import {
  IPackageDetailsForm,
  PackageDetailsForm
} from '@/app/set-package/(pages)/package-details/package-details-form';
import { InterestArea } from '@/api/interest-areas/interest-area';

export interface PackageDetailsProps {
  interestArea: InterestArea[];
}

export const PackageDetails = ({ interestArea }: PackageDetailsProps) => {
  const onSubmit = (formValues: IPackageDetailsForm) => {
    console.log('formValues: ', formValues);
  };

  return (
    <PackageDetailsForm onSubmit={onSubmit} interestArea={interestArea} />
  );
};
