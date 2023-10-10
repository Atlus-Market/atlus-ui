'use client';

import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { ReactNode } from 'react';

export interface SharePackageSendMessageForm {
  message: string;
  recipients: string[];
}

const schema: ObjectSchema<SharePackageSendMessageForm> = object({
  message: string().required(RequiredField),
  recipients: array().min(1, 'Select at least one recipient').required(RequiredField),
});

interface SharePackageSendMessageFormProps {
  packageId: string;
  children: ReactNode;
}

export const SharePackageSendMessageForm = ({
  packageId,
  children,
}: SharePackageSendMessageFormProps) => {
  const formProps = useAtlusForm<SharePackageSendMessageForm>({
    formOptions: {
      resolver: yupResolver(schema),
    },
  });
  const onSubmit = async (sendMessageForm: SharePackageSendMessageForm) => {
    console.log('submitForm: ', sendMessageForm);
    // await mutateAsync(sendMessageForm.message);
    // formProps.reset();
  };

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      {children}
    </AtlusForm>
  );
};
