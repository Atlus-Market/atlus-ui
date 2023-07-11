'use client';

import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { phoneNumberValidator } from '@/components/ui/form/validators/phone-number-validator';
import { passwordValidator } from '@/components/ui/form/validators/password-validator';
import { forwardRef, useImperativeHandle } from 'react';
import {
  CreateAccountRefExposedProps,
  UserAccountForm
} from '@/app/onboarding/components/create-user-account';

interface CreateUserAccountFormProps {
  onSubmit: (formValues: UserAccountForm) => void;
}

const schema: ObjectSchema<UserAccountForm> = object({
  firstName: string().trim().required(RequiredField),
  lastName: string().trim().required(RequiredField),
  companyName: string().trim().required(RequiredField),
  title: string().trim().required(RequiredField),
  businessPhone: string()
    .trim()
    .optional()
    .default('')
    .test(phoneNumberValidator),
  email: string().trim().email().required(RequiredField),
  password: string().trim().required(RequiredField).test(passwordValidator)
});
export const CreateBuyerAccountForm = forwardRef<
  CreateAccountRefExposedProps,
  CreateUserAccountFormProps
>(function CreateUserAccountForm({ onSubmit }, ref) {
  const formProps = useAtlusForm<UserAccountForm>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: {
        firstName: 'John',
        lastName: 'Doe',
        businessPhone: '+541168071234',
        email: `sergio+${Math.random()}@toptal.com`,
        companyName: 'Ofinno',
        title: 'Developer',
        password: 'fay$0FgTx7F8@9RW'
      }
    }
  });
  const { register, handleSubmit } = formProps;

  useImperativeHandle(
    ref,
    () => {
      return {
        submitForm: handleSubmit(onSubmit)
      };
    },
    [handleSubmit, onSubmit]
  );

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
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
        label='Role'
        placeholder='Business Development Manager'
        type='text'
        {...register('title')}
      />

      <AtlusFormInput
        label='Business phone (Optional)'
        placeholder='(+1)(123) 456 7890'
        type='tel'
        {...register('businessPhone')}
      />

      <AtlusFormInput
        label='Work email'
        placeholder='johndoe@vistatech.com'
        type='email'
        {...register('email')}
      />

      <AtlusFormInput
        label='Password'
        placeholder='Set a password'
        type='password'
        {...register('password')}
      />
    </AtlusForm>
  );
});
