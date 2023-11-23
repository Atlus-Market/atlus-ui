import { object, ObjectSchema, string } from 'yup';
import { BaseUserSettings } from '@/app/settings/components/form/base-user-settings';
import { RequiredField } from '@/constants/form';
import { phoneNumberValidator } from '@/components/ui/form/validators/phone-number-validator';

export const baseSettingsFormSchema: ObjectSchema<BaseUserSettings> = object({
  firstName: string().trim().required(RequiredField),
  lastName: string().trim().required(RequiredField),
  cellPhone: string().trim().required(RequiredField).test(phoneNumberValidator),
  companyName: string().trim().required(RequiredField),
  title: string().trim().required(RequiredField),
  timezone: string().trim().required(RequiredField),
});
