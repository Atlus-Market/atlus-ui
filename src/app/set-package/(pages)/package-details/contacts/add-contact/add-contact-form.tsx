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
import { createSeller } from '@/api/seller/create-seller';
import { addContact } from '@/api/contacts/add-contact';
import { HiUser } from 'react-icons/hi2';
import { Contact } from '@/models/contact';

export interface AddContact {
  id?: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
}

const schema: ObjectSchema<AddContact> = object({
  id: string().trim(),
  firstName: string().trim().required(RequiredField),
  lastName: string().trim().required(RequiredField),
  companyName: string().trim().required(RequiredField),
  phoneNumber: string()
    .trim()
    .optional()
    .default('')
    .test(phoneNumberValidator),
  email: string().trim().email().required(RequiredField)
});

interface AddContactFormProps {
  onContactAdded?: (contact: Contact) => void;
  initialValues?: Contact;
}

export interface AddContactRefExposedProps {
  submitForm: () => Promise<void>;
  isFormValid: boolean;
}

export const AddContactForm = forwardRef<
  AddContactRefExposedProps,
  AddContactFormProps
>(function AddContactForm({ onContactAdded, initialValues }, ref) {
  const formProps = useAtlusForm<AddContact>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: initialValues
    }
  });
  const { register, handleSubmit, formState: { errors, isValid } } = formProps;
  console.log(errors);

  const createSellerMutation = useMutation({
    mutationFn: createSeller
  });
  const {
    isLoading: isLoadingMutation,
    mutateAsync: createSellerAsync
  } = createSellerMutation;

  const addContactMutation = useMutation({
    mutationFn: addContact
  });

  const { mutateAsync: addContactAsync } = addContactMutation;

  const onSubmit = useCallback(async (formValues: AddContact) => {
    const response = await createSellerAsync(formValues);
    await addContactAsync({ userId: response.userId });
    onContactAdded?.({
      id: response.userId,
      ...formValues
    });
  }, [createSellerAsync, addContactAsync, onContactAdded]);

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
    </AtlusForm>
  );
});
