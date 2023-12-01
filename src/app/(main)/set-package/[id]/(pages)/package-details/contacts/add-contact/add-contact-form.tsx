import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddSeller } from '@/app/(main)/set-package/[id]/(pages)/package-details/contacts/add-contact/add-contact-form-fields';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { phoneNumberValidator } from '@/components/ui/form/validators/phone-number-validator';
import { ReactNode, useCallback } from 'react';
import { Contact } from '@/models/contact';
import { useMutation } from '@tanstack/react-query';
import { updateSeller, UpdateSellerPayload } from '@/api/seller/update-seller';
import { createSeller } from '@/api/seller/create-seller';
import { addContact } from '@/api/contacts/add-contact';
import { emailField } from '@/components/ui/form/validators/email-field';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';

const schema: ObjectSchema<AddSeller> = object({
  id: string().trim(),
  firstName: string().trim().required(RequiredField),
  lastName: string().trim().required(RequiredField),
  companyName: string().trim().required(RequiredField),
  phoneNumber: string().trim().optional().default('').test(phoneNumberValidator),
  email: emailField,
});

interface AddContactForm {
  children: ReactNode;
  initialValues?: Contact;
  onContactAdded?: (contact: Contact) => void;
}

export const AddContactForm = ({ initialValues, children, onContactAdded }: AddContactForm) => {
  const formProps = useAtlusForm<AddSeller>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: initialValues,
    },
  });

  const setSellerMutation = useMutation({
    mutationFn: async (
      sellerPayload: UpdateSellerPayload
    ): Promise<{
      sellerId: string;
    }> => {
      const response = {
        sellerId: sellerPayload.id,
      };
      if (sellerPayload.id) {
        await updateSeller(sellerPayload);
        showSuccessNotification({ text: 'Contact updated successfully.' });
      } else {
        const res = await createSeller(sellerPayload);
        await addContactAsync({ userId: res.userId });
        response.sellerId = res.userId;
        showSuccessNotification({ text: 'Contact created successfully.' });
      }
      return response;
    },
  });
  const { mutateAsync: createSellerAsync } = setSellerMutation;

  const addContactMutation = useMutation({
    mutationFn: addContact,
  });

  const { mutateAsync: addContactAsync } = addContactMutation;

  const onSubmit = useCallback(
    async (formValues: AddSeller) => {
      try {
        const sellerPayload: UpdateSellerPayload = {
          ...formValues,
          id: formValues.id ?? '',
        };
        const response = await createSellerAsync(sellerPayload);
        onContactAdded?.({
          id: response.sellerId,
          ...formValues,
        });
      } catch (e) {
        console.error(e);
      }
    },
    [createSellerAsync, onContactAdded]
  );

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      {children}
    </AtlusForm>
  );
};
