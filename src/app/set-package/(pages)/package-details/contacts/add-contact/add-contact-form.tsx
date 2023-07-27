'use client';

import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { phoneNumberValidator } from '@/components/ui/form/validators/phone-number-validator';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { forwardRef, useImperativeHandle } from 'react';

export interface AddContact {
  name: string;
  companyName: string;
  email: string;
  businessPhone: string;
}

const schema: ObjectSchema<AddContact> = object({
  name: string().trim().required(RequiredField),
  companyName: string().trim().required(RequiredField),
  businessPhone: string()
    .trim()
    .optional()
    .default('')
    .test(phoneNumberValidator),
  email: string().trim().email().required(RequiredField)
});

interface AddContactFormProps {
  onSubmit: (formValues: AddContact) => void;
}

export interface AddContactRefExposedProps {
  submitForm: () => Promise<void>;
  isFormValid: boolean;
}

export const AddContactForm = forwardRef<
  AddContactRefExposedProps,
  AddContactFormProps
>(function AddContactForm({ onSubmit }, ref) {
  const formProps = useAtlusForm<AddContact>({
    formOptions: {
      resolver: yupResolver(schema)
    }
  });
  const { register, handleSubmit, formState: { errors, isValid } } = formProps;
  console.log(errors);


  useImperativeHandle(
    ref,
    () => {
      return {
        submitForm: handleSubmit(onSubmit),
        isFormValid: isValid
      };
    },
    [handleSubmit, onSubmit, isValid]
  );


  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      <AtlusFormInput
        label='Name'
        placeholder='John Doe'
        type='text'
        {...register('name')}
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
        {...register('businessPhone')}
      />
    </AtlusForm>
  );
});
