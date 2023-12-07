'use client';

import { array, boolean, number, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAppSelector } from '@/redux/hooks';
import { selectPackageDetailsFormValues } from '@/redux/features/set-package/selectors/package-details.selectors';
import { ReactNode, useCallback } from 'react';
import { Visibility } from '@/components/common/dropdown/visibility-options';
import { useSubmitPackageDetailsForm } from '@/app/(main)/set-package/[id]/(pages)/package-details/use-submit-package-details-form';
import {
  hasValidTitleName,
  invalidTitleErrorMessage,
} from '@/app/(main)/set-package/[id]/(pages)/package-details/package-details-title';
import { AtlusDialogModal } from '@/components/ui/modal/dialog/atlus-dialog-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { useRouter } from 'next/navigation';
import { SetNewPackageUrl, SetPackagePatent } from '@/constants/routes';
import {
  selectPackage,
  selectPackagePatents,
} from '@/redux/features/set-package/selectors/set-package.selectors';
import { Package } from '@/models/package';

export type IPackageDetailsForm = Pick<
  Package,
  | 'title'
  | 'description'
  | 'industryIds'
  | 'keywords'
  | 'visibility'
  | 'priceUsd'
  | 'openToLicensing'
  | 'showPublicPricing'
  | 'sellerUserId'
  | 'products'
  | 'containsSep'
  | 'sepStandardIds'
  | 'status'
>;

export type ExtendedPackageDetailsForm = IPackageDetailsForm & {
  [hasValidTitleName]: boolean;
};

export const packageDetailsSchema: ObjectSchema<ExtendedPackageDetailsForm> = object({
  title: string().default('').trim().required(RequiredField),
  description: string().default('').trim().required(RequiredField),
  industryIds: array().min(1, 'Select at least one industry').required(RequiredField),
  keywords: array().min(1, 'Enter at least one keyword').required(RequiredField),
  visibility: number().default(Visibility.Public).required(RequiredField),
  priceUsd: number().min(0, 'Price must be greater than $0').default(0).required(RequiredField),
  openToLicensing: boolean().default(false).required(RequiredField),
  showPublicPricing: boolean().default(false).required(RequiredField),
  sellerUserId: string().required(RequiredField),
  products: array().default([]),
  containsSep: boolean().default(false).required(RequiredField),
  sepStandardIds: array()
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
  const { isOn, setOff, setOn } = useToggleState(false);
  const router = useRouter();
  const packageDetailsFormValues = useAppSelector(selectPackageDetailsFormValues);
  const activePackage = useAppSelector(selectPackage);
  const patents = useAppSelector(selectPackagePatents);

  const formProps = useAtlusForm<ExtendedPackageDetailsForm>({
    formOptions: {
      resolver: yupResolver(packageDetailsSchema),
      defaultValues: packageDetailsFormValues,
    },
  });

  const savePackage = useSubmitPackageDetailsForm();

  const onSubmit = useCallback(
    (formValues: ExtendedPackageDetailsForm) => {
      if (patents.length === 0) {
        setOn();
      } else {
        savePackage(formValues);
      }
    },
    [patents.length, savePackage, setOn]
  );

  return (
    <>
      <AtlusDialogModal
        isOpen={isOn}
        title="Attention"
        text="The package can't be saved because it doesn't have any patent. Do you want to add one now?"
        mainButton={{
          text: 'Add a patent',
          onClick: () => {
            setOff();
            if (activePackage) {
              router.push(SetPackagePatent(activePackage.id));
            } else {
              router.push(SetNewPackageUrl);
            }
          },
        }}
        secondaryButton={{
          text: 'Cancel',
          onClick: setOff,
        }}
      />

      <AtlusForm formProps={formProps} onSubmit={onSubmit} className="max-w-[710px]">
        {children}
      </AtlusForm>
    </>
  );
};
