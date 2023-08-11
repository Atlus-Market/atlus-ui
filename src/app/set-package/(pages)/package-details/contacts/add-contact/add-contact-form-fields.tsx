'use client';

import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { HiUser } from 'react-icons/hi2';
import { useFormContext } from 'react-hook-form';

export interface AddSeller {
  id?: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
}

export const AddContactFormFields = () => {
  const formProps = useFormContext();
  const { register, formState: { errors } } = formProps;

  return (
    <div>
      <div className='w-full text-center mb-4'>
        <div className='bg-lightest-grey rounded-[50%] p-5 inline-block'>
          <HiUser color='var(--color-white)' size={46} />
        </div>
      </div>

      <AtlusFormInput
        label='First name'
        placeholder='John'
        type='text'
        {...register('firstName')}
      />

      <AtlusFormInput
        label='Last name'
        placeholder='Doe'
        type='text'
        {...register('lastName')}
      />

      <AtlusFormInput
        label='Company'
        placeholder='Vista Technologies'
        type='text'
        {...register('companyName')}
      />

      <AtlusFormInput
        label='Work email'
        placeholder='johndoe@vistatech.com'
        type='email'
        {...register('email')}
      />

      <AtlusFormInput
        label='Phone number'
        placeholder='(+1)(123) 456 7890'
        type='tel'
        {...register('phoneNumber')}
      />
    </div>
  );
};
