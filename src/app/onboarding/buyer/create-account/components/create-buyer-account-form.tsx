'use client';

import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ObjectSchema, string } from 'yup';
import { PhoneNumberPlaceholder, RequiredField } from '@/constants/form';
import { optionalPhoneNumberValidator } from '@/components/ui/form/validators/phone-number-validator';
import { passwordValidator } from '@/components/ui/form/validators/password-validator';
import { forwardRef, useImperativeHandle } from 'react';
import {
  CreateAccountRefExposedProps,
  UserAccountForm,
} from '@/app/onboarding/components/create-user-account';
import { emailField } from '@/components/ui/form/validators/email-field';

interface CreateUserAccountFormProps {
  onSubmit: (formValues: UserAccountForm) => void;
}

const schema: ObjectSchema<UserAccountForm> = object({
  firstName: string().trim().required(RequiredField),
  lastName: string().trim().required(RequiredField),
  companyName: string().trim().required(RequiredField),
  title: string().trim().required(RequiredField),
  businessPhone: string().trim().optional().default('').test(optionalPhoneNumberValidator),
  email: emailField,
  password: string().trim().required(RequiredField).test(passwordValidator),
});
export const CreateBuyerAccountForm = forwardRef<
  CreateAccountRefExposedProps,
  CreateUserAccountFormProps
>(function CreateUserAccountForm({ onSubmit }, ref) {
  const formProps = useAtlusForm<UserAccountForm>({
    formOptions: {
      resolver: yupResolver(schema),
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formProps;
  console.log(errors);

  useImperativeHandle(
    ref,
    () => {
      return {
        submitForm: handleSubmit(onSubmit),
      };
    },
    [handleSubmit, onSubmit]
  );

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      <AtlusFormInput
        label="First name"
        placeholder="John"
        type="text"
        {...register('firstName')}
      />

      <AtlusFormInput label="Last name" placeholder="Doe" type="text" {...register('lastName')} />

      <AtlusFormInput
        label="Company"
        placeholder="Vista Technologies"
        type="text"
        {...register('companyName')}
      />

      <AtlusFormInput
        label="Role"
        placeholder="Business Development Manager"
        type="text"
        {...register('title')}
      />

      <AtlusFormInput
        label="Business phone (Optional)"
        placeholder={PhoneNumberPlaceholder}
        type="tel"
        {...register('businessPhone')}
      />

      <AtlusFormInput
        label="Work email"
        placeholder="johndoe@vistatech.com"
        type="email"
        {...register('email')}
      />

      <AtlusFormInput
        label="Password"
        placeholder="Set a password"
        type="password"
        {...register('password')}
      />
    </AtlusForm>
  );
});
