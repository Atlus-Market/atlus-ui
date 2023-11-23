'use client';

import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useForm } from 'react-hook-form';
import { BaseUserSettings } from '@/app/settings/components/base-user-settings';
import { boolean, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BuyerSettingsFormFields } from '@/app/settings/components/buyer/buyer-settings-form-fields';
import { phoneNumberValidator } from '@/components/ui/form/validators/phone-number-validator';
import { User } from '@/models/user';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useUpdateUser } from '@/hooks/data/use-update-user';

interface BuyerSettingsFormProps {
  user: User;
  showChangeEmailModal: () => void;
  showChangePwdModal: () => void;
}

export interface BuyerSettings extends BaseUserSettings {
  privateProfile: boolean;
}

export const baseSettingsFormSchema: ObjectSchema<BaseUserSettings> = object({
  firstName: string().trim().required(RequiredField),
  lastName: string().trim().required(RequiredField),
  cellPhone: string().trim().required(RequiredField).test(phoneNumberValidator),
  companyName: string().trim().required(RequiredField),
  title: string().trim().required(RequiredField),
  timezone: string().trim().required(RequiredField),
});

const buyerSettingsSchema: ObjectSchema<BuyerSettings> = baseSettingsFormSchema.shape({
  privateProfile: boolean().default(false).required(),
});
export const BuyerSettingsForm = ({
  user,
  showChangeEmailModal,
  showChangePwdModal,
}: BuyerSettingsFormProps) => {
  const formProps = useForm<BuyerSettings>({
    resolver: yupResolver(buyerSettingsSchema),
    values: user,
  });
  const { mutate, isLoading } = useUpdateUser({ userId: user.id });

  return (
    <AtlusForm formProps={formProps} onSubmit={formValues => mutate(formValues)}>
      <BuyerSettingsFormFields
        user={user}
        showChangeEmailModal={showChangeEmailModal}
        showChangePwdModal={showChangePwdModal}
      />
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
