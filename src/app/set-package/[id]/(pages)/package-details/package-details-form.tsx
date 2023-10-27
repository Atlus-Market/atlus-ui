'use client';

import { array, boolean, number, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAppSelector } from '@/redux/hooks';
import { selectPackageDetailsFormValues } from '@/redux/features/set-package/selectors/package-details.selectors';
import { ReactNode } from 'react';
import { Visibility } from '@/components/common/dropdown/visibility-options';
import { useSubmitPackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/use-submit-package-details-form';
import { PackageStatus } from '@/models/package-status';
import {
  hasValidTitleName,
  invalidTitleErrorMessage,
} from '@/app/set-package/[id]/(pages)/package-details/package-details-title';

export interface IPackageDetailsForm {
  title: string;
  description: string;
  industryIds: number[];
  keywords: string[];
  visibility: Visibility;
  priceUsd: number;
  openToLicensing: boolean;
  showPublicPricing: boolean;
  sellerUserId: string;
  products: string[];
  containsSep: boolean;
  sepStandards: string[];
  status: PackageStatus;
}

export type ExtendedPackageDetailsForm = IPackageDetailsForm & {
  [hasValidTitleName]: boolean;
};

export const packageDetailsSchema: ObjectSchema<ExtendedPackageDetailsForm> = object({
  title: string().default('').trim().required(RequiredField),
  description: string().default('').trim().required(RequiredField),
  industryIds: array().min(1, 'Select at least one industry').required(RequiredField),
  keywords: array().min(1, 'Enter at least one keyword').required(RequiredField),
  visibility: number().required(RequiredField),
  priceUsd: number().min(0, 'Price must be greater than $0').default(0).required(RequiredField),
  openToLicensing: boolean().default(false).required(RequiredField),
  showPublicPricing: boolean().default(false).required(RequiredField),
  sellerUserId: string().required(RequiredField),
  products: array().default([]),
  containsSep: boolean().required(RequiredField),
  sepStandards: array()
    .default([])
    .when('containsSep', {
      is: (val: boolean) => val, // alternatively: (val) => val == true
      then: schema => schema.min(1, 'Select at least one standard').required(RequiredField),
      otherwise: schema =>
        schema.max(0).transform((value, originalValue, context) => {
          return [];
        }),
    }),
  status: number().required(RequiredField),

  /**
   * Extra field to handle the state of async title validation.
   * react-hook-form clears custom errors on registered input fields after
   * form submission. Setting a custom error on title won't persist after form submission.
   *
   * This field is part of the validation, but it's not registered with any input,
   * so errors are kept after form submission.
   */
  [hasValidTitleName]: boolean()
    .oneOf([true], invalidTitleErrorMessage)
    .default(false)
    .required(invalidTitleErrorMessage),
});

export interface PackageDetailsFormProps {
  children: ReactNode;
}

export const PackageDetailsForm = ({ children }: PackageDetailsFormProps) => {
  const packageDetailsFormValues = useAppSelector(selectPackageDetailsFormValues);
  console.log('[PackageDetailsForm] form values: ', packageDetailsFormValues);

  const formProps = useAtlusForm<ExtendedPackageDetailsForm>({
    formOptions: {
      resolver: yupResolver(packageDetailsSchema),
      defaultValues: packageDetailsFormValues,
    },
  });
  const {
    formState: { errors },
  } = formProps;
  console.log('[PackageDetailsForm] errors:', errors);

  const onSubmit = useSubmitPackageDetailsForm();

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      {children}
    </AtlusForm>
  );
};
