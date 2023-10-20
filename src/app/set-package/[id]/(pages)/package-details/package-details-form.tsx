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
}

export const packageDetailsSchema: ObjectSchema<IPackageDetailsForm> = object({
  title: string().default('').trim().required(RequiredField),
  description: string().default('').trim().required(RequiredField),
  industryIds: array().min(1, 'Select at least one industry').required(RequiredField),
  keywords: array().min(1, 'Enter at least one keyword').required(RequiredField),
  visibility: number().required(RequiredField),
  priceUsd: number().min(0, 'Price must be greater than $0').default(0).required(RequiredField),
  openToLicensing: boolean().default(false).required(RequiredField),
  showPublicPricing: boolean().default(false).required(RequiredField),
  sellerUserId: string().default('').required(RequiredField),
  products: array().min(1, 'Enter at least one product').required(RequiredField),
  containsSep: boolean().required(RequiredField),
  sepStandards: array()
    .default([])
    .when('containsSep', {
      is: true, // alternatively: (val) => val == true
      then: schema => schema.required(RequiredField),
      otherwise: schema => schema.optional(),
    }),
});

export interface PackageDetailsFormProps {
  children: ReactNode;
}

export const PackageDetailsForm = ({ children }: PackageDetailsFormProps) => {
  const packageDetailsFormValues = useAppSelector(selectPackageDetailsFormValues);
  console.log('packageDetailsFormValues: ', packageDetailsFormValues);
  const formProps = useAtlusForm<IPackageDetailsForm>({
    formOptions: {
      resolver: yupResolver(packageDetailsSchema),
      defaultValues: packageDetailsFormValues,
    },
  });
  const {
    formState: { errors },
  } = formProps;
  console.log('Package Details form errors:', errors);

  const onSubmit = (detailsForm: IPackageDetailsForm) => {
    console.log('onSubmit: ', detailsForm);
  };

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      {children}
    </AtlusForm>
  );
};
