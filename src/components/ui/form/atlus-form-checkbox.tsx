'use client';

import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { forwardRef, useRef } from 'react';
import { AtlusCheckbox, AtlusCheckboxProps } from '@/components/ui/checkbox/atlus-checkbox';

export interface AtlusFormCheckboxProps extends AtlusCheckboxProps {
  name: string;
}

export const AtlusFormCheckbox = forwardRef<HTMLInputElement, AtlusFormCheckboxProps>(
  function AtlusFormCheckbox({ name, ...rest }, ref) {
    const { control, setValue } = useFormContext();
    const { errors } = useFormState({
      name: name,
      exact: true,
    });

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <AtlusCheckbox {...rest} {...field} checked={field.value} errors={errors} />
        )}
      />
    );
  }
);
