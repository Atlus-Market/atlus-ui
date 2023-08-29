'use client';

import { AtlusInputProps } from '@/components/ui/input/atlus-input';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { forwardRef } from 'react';
import { AtlusInputNumeric } from '@/components/ui/input/atlus-input-numeric';

export interface AtlusFormInputProps extends AtlusInputProps {
}

export const AtlusFormInputNumeric = forwardRef<HTMLInputElement, AtlusFormInputProps>(
  function AtlusFormInputNumeric({ name, type, ...rest }, ref) {
    const { errors } = useFormState({
      name: name,
      exact: true
    });
    const { control, setValue, getValues } = useFormContext();

    return (
      <Controller
        control={control}
        name={name!}
        render={(props) => (
          <AtlusInputNumeric {...rest} errors={errors} {...props.field} />
        )}
      />
    );


  }
);
