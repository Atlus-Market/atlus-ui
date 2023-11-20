'use client';

import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useForm } from 'react-hook-form';
import { BaseUserSettings } from '@/app/settings/components/base-user-settings';
import { boolean, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@/models/user';
import { BuyerSettingsFormFields } from '@/app/settings/components/buyer/buyer-settings-form-fields';
import { phoneNumberValidator } from '@/components/ui/form/validators/phone-number-validator';

interface BuyerSettingsFormProps {
  user: User;
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
export const BuyerSettingsForm = ({ user }: BuyerSettingsFormProps) => {
  const formProps = useForm<BuyerSettings>({
    resolver: yupResolver(buyerSettingsSchema),
    defaultValues: user,
  });
  return (
    <AtlusForm formProps={formProps}>
      <BuyerSettingsFormFields user={user} />
    </AtlusForm>
  );
};
