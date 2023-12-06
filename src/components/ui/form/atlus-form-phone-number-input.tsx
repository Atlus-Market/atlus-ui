'use client';

import { useFormContext, useFormState } from 'react-hook-form';
import { forwardRef, useCallback } from 'react';
import {
  AtlusPhoneNumberInput,
  AtlusPhoneNumberInputProps,
} from '@/components/ui/input/phone-number/atlus-phone-number-input';

export interface AtlusFormPhoneNumberInput extends AtlusPhoneNumberInputProps {}

export const AtlusFormPhoneNumberInput = forwardRef<HTMLInputElement, AtlusFormPhoneNumberInput>(
  function AtlusFormInput({ name, ...rest }, ref) {
    const { setValue } = useFormContext();
    const { errors } = useFormState({
      name: name,
      exact: true,
    });

    const dialCodeInputName = rest.dialCodeInputName || 'countryCode';
    const onCountryCodeChanged = useCallback(
      (countryCode: string) => {
        setValue(dialCodeInputName, countryCode);
      },
      [dialCodeInputName, setValue]
    );

    return (
      <AtlusPhoneNumberInput
        {...rest}
        dialCodeInputName={dialCodeInputName}
        name={name}
        ref={ref}
        errors={errors}
        onCountryCodeChanged={onCountryCodeChanged}
      />
    );
  }
);
