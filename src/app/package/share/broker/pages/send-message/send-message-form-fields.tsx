'use client';

import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';
import { useFormContext } from 'react-hook-form';
import { SharePackageSendMessageForm } from '@/app/package/share/broker/pages/send-message/send-message-form';
import { RecipientsTagsList } from '@/app/package/share/broker/pages/find-recipients/components/common/recipients-tags-list';
import { Recipient } from '@/redux/features/share-package/slices/find-recipients/recipient';
import { useEffect } from 'react';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';

interface SendMessageFormFieldsProps {
  recipients: Recipient[];
  onRemoveRecipient: (id: string) => void;
}

export const SendMessageFormFields = ({
  recipients,
  onRemoveRecipient,
}: SendMessageFormFieldsProps) => {
  const formProps = useFormContext<SharePackageSendMessageForm>();
  const { setValue } = formProps;

  useEffect(() => {
    const recipientsEmails = recipients.map(r => r.email);
    setValue('recipients', recipientsEmails, { shouldValidate: true });
  }, [recipients, setValue]);

  return (
    <>
      <AtlusFormInput
        {...formProps.register('recipients')}
        inputClassName="hidden"
        leftCmp={
          <RecipientsTagsList recipients={recipients} onRemoveRecipient={onRemoveRecipient} />
        }
      />
      <AtlusFormTextarea
        textAreaClassName="!min-h-[243px] md:!min-h-[220px]"
        placeholder="Write a message..."
        {...formProps.register('message')}
      />
    </>
  );
};
