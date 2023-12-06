'use client';

import { useFormContext, useFormState } from 'react-hook-form';
import { forwardRef, useCallback, useMemo } from 'react';
import {
  AtlusPhoneNumberInput,
  AtlusPhoneNumberInputProps,
} from '@/components/ui/input/phone-number/atlus-phone-number-input';
import {
  defaultCountry,
  getCountryByDialCode,
} from '@/components/ui/input/phone-number/country-options';

export interface AtlusFormPhoneNumberInput extends AtlusPhoneNumberInputProps {}

export const AtlusFormPhoneNumberInput = forwardRef<HTMLInputElement, AtlusFormPhoneNumberInput>(
  function AtlusFormInput({ name, ...rest }, ref) {
    const { setValue, getValues } = useFormContext();
    const { errors } = useFormState({
      name: name,
      exact: true,
    });

    const dialCodeInputName = rest.dialCodeInputName;
    const onCountryCodeChanged = useCallback(
      (countryCode: string) => {
        setValue(dialCodeInputName, countryCode);
      },
      [dialCodeInputName, setValue]
    );

    const countryCode = useMemo(() => {
      const dialCode = getValues(dialCodeInputName);
      if (dialCode === defaultCountry.dialCode) {
        return defaultCountry.code;
      }
      if (dialCode) {
        const countries = getCountryByDialCode(dialCode);
        if (countries.length > 0) {
          return countries[0].code;
        }
      }
      return defaultCountry.code;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <AtlusPhoneNumberInput
        {...rest}
        dialCodeInputName={dialCodeInputName}
        name={name}
        ref={ref}
        errors={errors}
        onCountryCodeChanged={onCountryCodeChanged}
        defaultCountryCode={countryCode}
      />
    );
  }
);
