'use client';

import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { phoneNumberValidator } from '@/components/ui/form/validators/phone-number-validator';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/api/user/create-user';

export interface AddContact {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  businessPhone: string;
}

const schema: ObjectSchema<AddContact> = object({
  firstName: string().trim().required(RequiredField),
  lastName: string().trim().required(RequiredField),
  companyName: string().trim().required(RequiredField),
  businessPhone: string()
    .trim()
    .optional()
    .default('')
    .test(phoneNumberValidator),
  email: string().trim().email().required(RequiredField)
});

interface AddContactFormProps {
}

export interface AddContactRefExposedProps {
  submitForm: () => Promise<void>;
  isFormValid: boolean;
}

export const AddContactForm = forwardRef<
  AddContactRefExposedProps,
  AddContactFormProps
>(function AddContactForm({}, ref) {
  const formProps = useAtlusForm<AddContact>({
    formOptions: {
      resolver: yupResolver(schema)
    }
  });
  const { register, handleSubmit, formState: { errors, isValid } } = formProps;
  console.log(errors);

  const mutation = useMutation({
    mutationFn: createUser
  });

  const { isLoading: isLoadingMutation, isSuccess, isError, mutateAsync } = mutation;

  const onSubmit = useCallback(async (formValues: AddContact) => {
    await mutateAsync({
      broker: true,
      cellPhone: '',
      dealSizePreference: undefined,
      password: 'fay$0FgTx7F8@9RW',
      title: '',
      dealTimeframePreference: undefined,
      interestAreas: [],
      interestCountryCodes: [],
      description: '',
      ...formValues,
    });
  }, [mutateAsync]);

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
        label='First name'
        placeholder='John'
        type='text'
        {...register('firstName')}
      />

      <
        AtlusFormInput
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
        {...register('businessPhone')}
      />
    </AtlusForm>
  );
});
