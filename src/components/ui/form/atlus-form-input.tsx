'use client';

import { AtlusInput, AtlusInputProps } from '@/components/ui/input/atlus-input';
import { useFormState } from 'react-hook-form';
import { forwardRef } from 'react';

export interface AtlusFormInputProps extends AtlusInputProps {}

export const AtlusFormInput = forwardRef<HTMLInputElement, AtlusFormInputProps>(
  function AtlusFormInput({ name, ...rest }, ref) {
    const { errors } = useFormState({
      name: name,
      exact: true,
    });

    return <AtlusInput {...rest} name={name} ref={ref} errors={errors} />;
  }
);
