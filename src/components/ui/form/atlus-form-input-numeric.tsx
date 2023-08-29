'use client';

import { AtlusInputProps } from '@/components/ui/input/atlus-input';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { forwardRef } from 'react';
import { AtlusInputNumeric } from '@/components/ui/input/atlus-input-numeric';

export interface AtlusFormInputProps extends AtlusInputProps {
  name: string;
}

export const AtlusFormInputNumeric = forwardRef<HTMLInputElement, AtlusFormInputProps>(
  function AtlusFormInputNumeric({ name, type, ...rest }, ref) {
    const { errors } = useFormState({
      name: name,
      exact: true
    });
    const { control } = useFormContext();

    return (
      <Controller
        control={control}
        name={name}
        render={(props) => (
          <AtlusInputNumeric
            {...rest}
            errors={errors}
            {...props.field}
            onChange={e => {
              const inputValue = e.target.value; // format: xxx,xxx.xx
              const floatValue = parseFloat(inputValue.replace(',', '')) || '';
              props.field.onChange({
                target: {
                  value: floatValue
                }
              });
            }}
          />
        )}
      />
    );


  }
);
