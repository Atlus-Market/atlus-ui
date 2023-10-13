'use client';

import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { ReactNode } from 'react';
import { useSharePackageMutation } from '@/app/package/share/broker/pages/send-message/useSharePackageMutation';
import { SharePackageRequestPayload } from '@/api/package/share-package';
import { PackageAccessValue } from '@/models/package-access-value';

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
  onMessageSent?: () => void;
}

export const SharePackageSendMessageForm = ({
  packageId,
  children,
  onMessageSent,
}: SharePackageSendMessageFormProps) => {
  const formProps = useAtlusForm<SharePackageSendMessageForm>({
    formOptions: {
      resolver: yupResolver(schema),
    },
  });

  const { mutateAsync } = useSharePackageMutation(packageId);

  const onSubmit = async (sharePackageSendMessageForm: SharePackageSendMessageForm) => {
    try {
      const shareP: SharePackageRequestPayload = {
        message: sharePackageSendMessageForm.message,
        recipients: sharePackageSendMessageForm.recipients.map(email => ({
          email,
          access: PackageAccessValue.LimitedAccess,
        })),
      };
      await mutateAsync(shareP);
      onMessageSent?.();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit} className="h-full">
      {children}
    </AtlusForm>
  );
};
