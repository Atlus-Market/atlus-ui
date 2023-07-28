'use client';

import { array, boolean, number, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';
import { AtlusFormDropdownList } from '@/components/ui/form/atlus-form-dropdown';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { HiOutlineLockClosed } from 'react-icons/hi2';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusFormCheckbox } from '@/components/ui/form/atlus-form-checkbox';
import { AtlusFormInputWithTags } from '@/components/ui/form/atlus-form-input-with-tags';
import {
  ContactsSelector
} from '@/app/set-package/(pages)/package-details/contacts/contacts-selector';
import { Controller } from 'react-hook-form';
import { useAppSelector } from '@/redux/hooks';
import {
  selectPackageDetailsFormValues
} from '@/redux/features/set-package/selectors/package-details.selectors';
import {
  SetPackageDetailsInStore
} from '@/app/set-package/(pages)/package-details/set-package-details-in-store';
import { InterestArea } from '@/api/interest-areas/interest-area';
import { useMemo } from 'react';

export interface IPackageDetailsForm {
  title: string;
  description: string;
  industry: string;
  keywords: string[];
  visibility: string;
  price: number;
  isOpenToLicensing: boolean;
  showPricingPublicly: boolean;
  sellerId: string;
}

const schema: ObjectSchema<IPackageDetailsForm> = object({
  title: string().default('').trim().required(RequiredField),
  description: string().default('').trim().required(RequiredField),
  industry: string().default('').trim().required(RequiredField),
  keywords: array().required(RequiredField),
  visibility: string().default('').trim().required(RequiredField),
  price: number().min(1).required(RequiredField).typeError('Price must be greater than $1'),
  isOpenToLicensing: boolean().default(false).required(RequiredField),
  showPricingPublicly: boolean().default(false).required(RequiredField),
  sellerId: string().default('').required(RequiredField)
});

const visibilityOptions: DropdownOption[] = [
  { label: 'Private', value: 'private' },
  { label: 'Public', value: 'public' }
];

export interface PackageDetailsFormProps {
  onSubmit: (formValues: IPackageDetailsForm) => void;
  interestArea: InterestArea[];
}

export const PackageDetailsForm = ({ onSubmit, interestArea }: PackageDetailsFormProps) => {
  const packageDetailsFormValues = useAppSelector(selectPackageDetailsFormValues);
  const formProps = useAtlusForm<IPackageDetailsForm>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: packageDetailsFormValues
    }
  });
  const { register, setValue, control, watch, handleSubmit, formState: { errors } } = formProps;
  console.log('Errors:', errors);

  const interestAreasOptions = useMemo<DropdownOption[]>(() => {
    return interestArea.map(ia => ({
      value: ia.id.toString(),
      label: ia.name
    }));
  }, [interestArea]);

  return (
    <div>
      <AtlusForm formProps={formProps} onSubmit={onSubmit}>
        <SetPackageDetailsInStore>
          <div className='pb-[44px]'>

            <AtlusFormInput
              label='Title'
              placeholder='Enter package title'
              type='text'
              {...register('title')}
            />

            <AtlusFormTextarea
              label='Description'
              placeholder='Write a description for your package'
              {...register('description')}
            />

            <AtlusFormDropdownList
              placeholder='Choose an industry'
              {...register('industry')}
              options={interestAreasOptions}
            />

            <AtlusFormInputWithTags
              label='Keywords'
              placeholder='Type and press Enter to add a keyword'
              type='text'
              name='keywords'
            />

            <AtlusFormDropdownList
              label='Visibility'
              placeholder='Visibility'
              name='visibility'
              options={visibilityOptions}
              leftIcon={<HiOutlineLockClosed size={16} />}
              bottomText='Only people you share the package with can view it.'
            />
          </div>

          <div className='pb-[44px]'>
            <AtlusTitle text='Pricing' className='!font-normal !text-2xl mb-6' />

            <AtlusFormInput
              label='Price (in USD)'
              placeholder='$'
              type='number'
              {...register('price')}
            />

            <AtlusFormCheckbox
              {...register('isOpenToLicensing')}
              wrapperClassName='mb-4 md:mb-6'
              label='This package is open to licensing.'
            />

            <AtlusFormCheckbox
              {...register('showPricingPublicly')}
              wrapperClassName='mb-4 md:mb-6'
              label='Show pricing details publicly.'
            />
          </div>

          <div>
            <AtlusTitle text='Seller information' className='!font-normal !text-2xl mb-6' />
            <div className='mb-6'>
            <span className='text-sm text-black leading-6'>
              Specify which seller you’re representing. This is for your records only and cannot be seen by others.
            </span>
            </div>
            <Controller
              control={control}
              name='sellerId'
              render={({ field: { name, onChange, value } }) => (
                <ContactsSelector onSellerSelected={onChange} selectedSellerId={value} />
              )}
            />
          </div>
        </SetPackageDetailsInStore>
      </AtlusForm>
    </div>
  );
};
