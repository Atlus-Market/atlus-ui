import { AnyObject, Maybe, object, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { phoneNumberBuilderValidator } from '@/components/ui/form/validators/phone-number-validator';
import { defaultCountry } from '@/components/ui/input/phone-number/country-options';

export interface PhoneNumberBuilder {
  phoneNumberBuilder?: {
    dialCode: string;
    phoneNumber: string;
  };
}

export const getPhoneNumberBuilderObject = ({ required }: { required: boolean }) => {
  const dialCode = string().default(defaultCountry.dialCode);
  const phoneNumber = string().default('');
  return object({
    phoneNumberBuilder: object({
      dialCode: required ? dialCode.required(RequiredField) : dialCode.optional(),
      phoneNumber: required
        ? phoneNumber.required(RequiredField).test(phoneNumberBuilderValidator(required))
        : phoneNumber.optional().test(phoneNumberBuilderValidator(required)),
    }),
  });
};

export const phoneNumberTransformer =
  <T extends Maybe<AnyObject>>(builderKey: string, destinationKey: string) =>
  (formValue: T) => {
    const phoneNumberBuilderKey = formValue?.[builderKey] as PhoneNumberBuilder;
    const code = phoneNumberBuilderKey?.phoneNumberBuilder?.dialCode || '';
    const num = phoneNumberBuilderKey?.phoneNumberBuilder?.phoneNumber || '';
    if (formValue) {
      formValue[destinationKey] = num.trim().length > 0 ? `${code}${num}` : '';
    }
    return formValue;
  };

export const createInitialPhoneNumberBuilderValue = (phoneNumber: string): PhoneNumberBuilder => {
  return {
    phoneNumberBuilder: {
      dialCode: '+54',
      phoneNumber: '1168075022',
    },
  };
};
