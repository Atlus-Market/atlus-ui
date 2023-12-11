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
import { AtlusFormPhoneNumberInput } from '@/components/ui/form/atlus-form-phone-number-input';
import {
  getPhoneNumberBuilderObject,
  PhoneNumberBuilder,
  phoneNumberTransformer,
} from '@/components/ui/form/schema/phone-number';

interface CreateUserAccountFormProps {
  onSubmit: (formValues: UserAccountForm) => void;
}

type CreateBuyerAccountForm = UserAccountForm & {
  cellPhoneBuilder?: PhoneNumberBuilder;
};

const schema: ObjectSchema<CreateBuyerAccountForm> = object({
  firstName: string().trim().required(RequiredField),
  lastName: string().trim().required(RequiredField),
  companyName: string().trim().required(RequiredField),
  title: string().trim().required(RequiredField),
  businessPhone: string().trim().optional().default('').test(optionalPhoneNumberValidator),
  cellPhoneBuilder: getPhoneNumberBuilderObject({ required: false }),
  email: emailField,
  password: string().trim().required(RequiredField).test(passwordValidator),
}).transform(phoneNumberTransformer('cellPhoneBuilder', 'businessPhone'));
export const CreateBuyerAccountForm = forwardRef<
  CreateAccountRefExposedProps,
  CreateUserAccountFormProps
>(function CreateUserAccountForm({ onSubmit }, ref) {
  const formProps = useAtlusForm<CreateBuyerAccountForm>({
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

      <AtlusFormPhoneNumberInput
        placeholder={PhoneNumberPlaceholder}
        {...register('cellPhoneBuilder.phoneNumberBuilder.phoneNumber')}
        dialCodeInputName="cellPhoneBuilder.phoneNumberBuilder.dialCode"
        label="Business phone (Optional)"
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
