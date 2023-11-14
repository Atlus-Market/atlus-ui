'use client';

import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { ReactNode, useCallback } from 'react';
import {
  SharePackageRecipient,
  SharePackageRequestPayload,
} from '@/api/package/access/share-package';
import { PackageAccessValue } from '@/models/package-access-value';

export interface ShareBuyerForm {
  emails: string[];
  message: string;
}

const schema: ObjectSchema<ShareBuyerForm> = object({
  emails: array().min(1).required(RequiredField),
  message: string().optional().default(''),
});

interface ShareBuyerPackageFormProps {
  children: ReactNode;
  onSubmit: (sharePackagePayload: SharePackageRequestPayload) => Promise<void>;
  onPackageShared: () => void;
}

export const ShareBuyerPackageForm = ({
  children,
  onSubmit,
  onPackageShared,
}: ShareBuyerPackageFormProps) => {
  const formProps = useAtlusForm<ShareBuyerForm>({
    formOptions: {
      resolver: yupResolver(schema),
    },
  });

  const onSubmitHandler = useCallback(
    async ({ emails, message }: ShareBuyerForm) => {
      console.log('formValues submit: ', emails, message);
      const recipients: SharePackageRecipient[] = emails.map(email => ({
        email,
        access: PackageAccessValue.LimitedAccess,
      }));
      try {
        await onSubmit({ message, recipients });
        onPackageShared();
      } catch (e) {
        console.error(e);
      }
    },
    [onPackageShared, onSubmit]
  );

  return (
    <AtlusForm className="h-full" formProps={formProps} onSubmit={onSubmitHandler}>
      {children}
    </AtlusForm>
  );
};
