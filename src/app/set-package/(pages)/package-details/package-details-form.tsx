'use client';

import { boolean, object, ObjectSchema, string } from 'yup';
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

export interface IPackageDetailsForm {
  title: string;
  description: string;
  industry: string;
  keywords: string;
  visibility: string;
  price: string;
  isOpenToLicensing: boolean;
  showPricingPublicly: boolean;
}

const schema: ObjectSchema<IPackageDetailsForm> = object({
  title: string().trim().required(RequiredField),
  description: string().trim().required(RequiredField),
  industry: string().trim().required(RequiredField),
  keywords: string().trim().required(RequiredField),
  visibility: string().trim().required(RequiredField),
  price: string().trim().required(RequiredField),
  isOpenToLicensing: boolean().default(false).required(RequiredField),
  showPricingPublicly: boolean().default(false).required(RequiredField)
});

const visibilityOptions: DropdownOption[] = [
  { label: 'Private', value: 'private' },
  { label: 'Public', value: 'public' }
];

export interface PackageDetailsFormProps {
  onSubmit: (formValues: IPackageDetailsForm) => void;
}

export const PackageDetailsForm = ({ onSubmit }: PackageDetailsFormProps) => {
  const formProps = useAtlusForm<IPackageDetailsForm>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: {
        industry: 'industry 2'
      }
    }
  });
  const { register, handleSubmit, formState: { errors } } = formProps;
  console.log(errors);

  return (
    <div>
      <AtlusForm formProps={formProps} onSubmit={onSubmit}>
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
            options={[
              { label: 'Industry 1', value: 'industry 1' },
              { label: 'Industry 2', value: 'industry 2' }
            ]}
          />

          <AtlusFormInput
            label='Keywords'
            placeholder='Type and press Enter to add a keyword'
            type='text'
            {...register('keywords')}
          />

          <AtlusFormDropdownList
            placeholder='Visibility'
            {...register('visibility')}
            options={visibilityOptions}
            leftIcon={<HiOutlineLockClosed size={16} />}
          />
        </div>

        <AtlusTitle text='Pricing' className='!font-normal !text-2xl mb-6' />

        <AtlusFormInput
          label='Price (in USD)'
          placeholder='$'
          type='text'
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

      </AtlusForm>
    </div>
  );
};
