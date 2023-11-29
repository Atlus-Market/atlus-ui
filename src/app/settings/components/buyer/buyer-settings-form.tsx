'use client';

import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useForm } from 'react-hook-form';
import { BaseUserSettings } from '@/app/settings/components/form/base-user-settings';
import { boolean, ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BuyerSettingsFormFields } from '@/app/settings/components/buyer/buyer-settings-form-fields';
import { User } from '@/models/user';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useUpdateUser } from '@/hooks/data/use-update-user';
import { baseSettingsFormSchema } from '@/app/settings/components/form/base-user-setting-schema';
import { DeleteAccount } from '@/app/settings/components/delete-account/delete-account';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';

interface BuyerSettingsFormProps {
  user: User;
  timezonesOptions: DropdownOption<string>[];
}

export interface BuyerSettings extends BaseUserSettings {
  privateProfile: boolean;
}

const buyerSettingsSchema: ObjectSchema<BuyerSettings> = baseSettingsFormSchema.shape({
  privateProfile: boolean().default(false).required(),
});

export const BuyerSettingsForm = ({ user, timezonesOptions }: BuyerSettingsFormProps) => {
  const formProps = useForm<BuyerSettings>({
    resolver: yupResolver(buyerSettingsSchema),
    defaultValues: buyerSettingsSchema.cast(user, { stripUnknown: true }),
  });
  const { mutate, isLoading } = useUpdateUser({ userId: user.id });

  return (
    <AtlusForm formProps={formProps} onSubmit={formValues => mutate(formValues)} className="w-full">
      <BuyerSettingsFormFields user={user} timezonesOptions={timezonesOptions} />
      <DeleteAccount />
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
