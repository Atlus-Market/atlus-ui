'use client';

import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';
import { useSendMessage } from '@/app/package/[id]/components/send-message/use-send-message';
import { Package } from '@/models/package';

interface PackageSendMessageForm {
  message: string;
}

const schema: ObjectSchema<PackageSendMessageForm> = object({
  message: string().required(RequiredField),
});

interface SendMessageFormProps {
  atlusPackage: Package;
}

export const SendMessageForm = ({ atlusPackage }: SendMessageFormProps) => {
  const formProps = useAtlusForm<PackageSendMessageForm>({
    formOptions: {
      resolver: yupResolver(schema),
    },
  });

  const { mutateAsync, isLoading } = useSendMessage({
    packageId: atlusPackage.id,
    brokerId: atlusPackage.brokerUserId,
  });

  const onSubmit = async (sendMessageForm: PackageSendMessageForm) => {
    console.log('submitForm: ', sendMessageForm);
    await mutateAsync(sendMessageForm.message);
    formProps.reset();
  };

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      <AtlusFormTextarea
        textAreaClassName="min-h-[150px]"
        placeholder="Write a message..."
        {...formProps.register('message')}
      />
      <AtlusButton variant="outline" type="submit" isLoading={isLoading}>
        Send Message
      </AtlusButton>
    </AtlusForm>
  );
};
