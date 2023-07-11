import { Validator } from '@/components/ui/form/validators/validator';
import { isValidPhoneNumber } from '@/utils/phone-number';

export const phoneNumberValidator: Validator<string | undefined> = {
  name: 'is-valid-phone-number',
  message:
    "Enter a valid phone number starting with a '+' followed by country code.",
  test: (value, context): boolean => isValidPhoneNumber(value),
};
