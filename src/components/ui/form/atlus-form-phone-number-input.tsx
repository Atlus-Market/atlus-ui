'use client';

import { useFormState } from 'react-hook-form';
import { forwardRef } from 'react';
import {
  AtlusPhoneNumberInput,
  AtlusPhoneNumberInputProps,
} from '@/components/ui/input/phone-number/atlus-phone-number-input';

export interface AtlusFormPhoneNumberInput extends AtlusPhoneNumberInputProps {}

export const AtlusFormPhoneNumberInput = forwardRef<HTMLInputElement, AtlusFormPhoneNumberInput>(
  function AtlusFormInput({ name, ...rest }, ref) {
    const { errors } = useFormState({
      name: name,
      exact: true,
    });

    return <AtlusPhoneNumberInput {...rest} name={name} ref={ref} errors={errors} />;
  }
);
