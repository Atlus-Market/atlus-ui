'use client';

import { array, boolean, number, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAppSelector } from '@/redux/hooks';
import {
  selectPackageDetailsFormValues
} from '@/redux/features/set-package/selectors/package-details.selectors';
import { ReactNode } from 'react';

export interface IPackageDetailsForm {
  title: string;
  description: string;
  industryIds: string[];
  keywords: string[];
  visibility: string;
  priceUsd: number;
  openToLicensing: boolean;
  showPublicPricing: boolean;
  sellerUserId: string;
}

export const packageDetailsSchema: ObjectSchema<IPackageDetailsForm> = object({
  title: string().default('').trim().required(RequiredField),
  description: string().default('').trim().required(RequiredField),
  industryIds: array().min(1).required(RequiredField),
  keywords: array().min(1).required(RequiredField).typeError('Enter at least one keyword'),
  visibility: string().required(RequiredField),
  priceUsd: number().min(0).default(0).required(RequiredField).typeError('Price must be greater than $0'),
  openToLicensing: boolean().default(false).required(RequiredField),
  showPublicPricing: boolean().default(false).required(RequiredField),
  sellerUserId: string().default('').required(RequiredField)
});

export interface PackageDetailsFormProps {
  children: ReactNode;
}

export const PackageDetailsForm = ({ children }: PackageDetailsFormProps) => {
  const packageDetailsFormValues = useAppSelector(selectPackageDetailsFormValues);
  const formProps = useAtlusForm<IPackageDetailsForm>({
    formOptions: {
      resolver: yupResolver(packageDetailsSchema),
      defaultValues: packageDetailsFormValues
    }
  });
  const { formState: { errors } } = formProps;
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
