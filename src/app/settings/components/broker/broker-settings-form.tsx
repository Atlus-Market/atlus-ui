'use client';

import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useForm } from 'react-hook-form';
import { BaseUserSettings } from '@/app/settings/components/form/base-user-settings';
import { ObjectSchema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@/models/user';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useUpdateUser } from '@/hooks/data/use-update-user';
import { baseSettingsFormSchema } from '@/app/settings/components/form/base-user-setting-schema';
import { BrokerSettingsFormFields } from '@/app/settings/components/broker/broker-settings-form-fields';

interface BrokerSettingsFormProps {
  user: User;
}

export interface BrokerSettings extends BaseUserSettings {
  externalUrl: string;
}

const brokerSettingsSchema: ObjectSchema<BrokerSettings> = baseSettingsFormSchema.shape({
  externalUrl: string().url('Enter a valid URL').optional().default(''),
});

export const BrokerSettingsForm = ({ user }: BrokerSettingsFormProps) => {
  const formProps = useForm<BrokerSettings>({
    resolver: yupResolver(brokerSettingsSchema),
    values: user,
  });
  const { mutate, isLoading } = useUpdateUser({ userId: user.id });

  return (
    <AtlusForm formProps={formProps} onSubmit={formValues => mutate(formValues)} className="w-full">
      <BrokerSettingsFormFields user={user} />
      <a className="text-orange">Delete account</a>
      <div className="flex justify-end">
        <AtlusButton
          className="atlus-btn-45 md:atlus-btn-53"
          type="submit"
          color="orange"
          variant="solid"
          isLoading={isLoading}
        >
          Save
        </AtlusButton>
      </div>
    </AtlusForm>
  );
};
