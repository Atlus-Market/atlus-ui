'use client';

import { useFormContext } from 'react-hook-form';
import { BuyerSettings } from '@/app/settings/components/buyer/buyer-settings-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { User } from '@/models/user';
import { PrivateProfile } from '@/app/settings/components/buyer/private-profile';
import { AtlusDivider } from '@/components/ui/divider/atlus-divider';
import { SettingsTitle } from '@/app/settings/components/settings-title';
import { UserAvatar } from '@/app/settings/components/user-avatar/user-avatar';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { ChangePasswordFormField } from '@/app/settings/components/change-password-form-field';
import { ChangeEmailFormField } from '@/app/settings/components/change-email-form-field';

interface BuyerSettingsFormFieldsProps {
  user: User;
}

export const BuyerSettingsFormFields = ({ user }: BuyerSettingsFormFieldsProps) => {
  const { register, getValues } = useFormContext<BuyerSettings>();

  return (
    <div>
      <UserAvatar user={user} />
      <AtlusFormInput placeholder="John" label="First name" {...register('firstName')} />
      <AtlusFormInput placeholder="Doe" label="Last name" {...register('lastName')} />
      <ChangeEmailFormField email={user.email} />
      <ChangePasswordFormField />
      <AtlusFormInput placeholder="+1 234 567 890" label="Phone" {...register('cellPhone')} />
      <PrivateProfile />

      <AtlusDivider className="my-6 md:mb-8" />
      <SettingsTitle title="Company information" />

      <AtlusFormInput
        placeholder="Vista Technologies"
        label="Company name"
        {...register('companyName')}
      />
      <AtlusFormInput
        placeholder="Business Development Manager"
        label="Your role"
        {...register('title')}
      />

      <AtlusDivider className="my-6 md:mb-8" />
      <SettingsTitle title="Account managment" />
    </div>
  );
};
