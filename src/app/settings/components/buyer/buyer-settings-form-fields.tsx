'use client';

import { useFormContext } from 'react-hook-form';
import { BuyerSettings } from '@/app/settings/components/buyer/buyer-settings-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { User } from '@/models/user';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';
import { ChangeLink } from '@/app/settings/components/change-link';
import { PrivateProfile } from '@/app/settings/components/buyer/private-profile';
import { AtlusDivider } from '@/components/ui/divider/atlus-divider';
import { SettingsTitle } from '@/app/settings/components/settings-title';
import { UserAvatar } from '@/app/settings/components/user-avatar/user-avatar';
import { TimezonesDropdownForm } from '@/components/common/timezones/timezone-selector';

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
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <AtlusFormLabel label="Email" />
          <span className="block text-soft-black text-sm md:text-base leading-normal">
            {user.email}
          </span>
        </div>
        <ChangeLink changePartText="email" />
      </div>
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <AtlusFormLabel label="Password" />
          <span className="block text-soft-black text-sm md:text-base leading-normal">
            ************
          </span>
        </div>
        <ChangeLink changePartText="password" />
      </div>
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

      <TimezonesDropdownForm name="timezone" />
    </div>
  );
};
