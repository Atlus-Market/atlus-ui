'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { User } from '@/models/user';
import { AtlusDivider } from '@/components/ui/divider/atlus-divider';
import { SettingsTitle } from '@/app/(main)/settings/components/settings-title';
import { BrokerSettings } from '@/app/(main)/settings/components/broker/broker-settings-form';
import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';
import { ChangeEmailFormField } from '@/app/(main)/settings/components/change-email-form-field';
import { ChangePasswordFormField } from '@/app/(main)/settings/components/change-password-form-field';
import { UserAvatar } from '@/app/(main)/settings/components/user-avatar/user-avatar';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';
import { UploadCompanyLogoField } from '@/app/(main)/settings/components/upload-company-logo-field';
import { AtlusFormPhoneNumberInput } from '@/components/ui/form/atlus-form-phone-number-input';

interface BrokerSettingsFormFieldsProps {
  user: User;
}

export const BrokerSettingsFormFields = ({ user }: BrokerSettingsFormFieldsProps) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<BrokerSettings>();

  const v = useWatch();
  console.log('form values: ', v);
  console.log('form errors: ', errors);

  return (
    <div>
      <UserAvatar user={user} />
      <AtlusFormInput placeholder="John" label="First name" {...register('firstName')} />
      <AtlusFormInput placeholder="Doe" label="Last name" {...register('lastName')} />
      <ChangeEmailFormField email={user.email} />
      <ChangePasswordFormField />

      <AtlusFormPhoneNumberInput
        placeholder="phone number"
        {...register('businessPhoneBuilder.phoneNumberBuilder.phoneNumber')}
        dialCodeInputName="businessPhoneBuilder.phoneNumberBuilder.dialCode"
        label="Business phone"
      />

      <AtlusFormPhoneNumberInput
        placeholder="phone number"
        {...register('cellPhoneBuilder.phoneNumberBuilder.phoneNumber')}
        dialCodeInputName="cellPhoneBuilder.phoneNumberBuilder.dialCode"
        label="Cell phone"
      />

      <AtlusFormInput
        placeholder="External URL"
        label="Link to your website (Optional)"
        {...register('externalUrl')}
      />

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

      <AtlusFormTextarea
        textAreaClassName="!min-h-[210px] md:!min-h-[195px]"
        label="Company description"
        placeholder="Write a short description about your company (Optional)"
        {...register('description')}
      />

      <AtlusFormLabel label="Company logo" />
      <UploadCompanyLogoField />

      <AtlusDivider className="my-6 md:mb-8" />
      <SettingsTitle title="Account managment" />
    </div>
  );
};
