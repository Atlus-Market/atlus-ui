'use client';

import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { forwardRef } from 'react';
import {
  AtlusDropdownList,
  AtlusDropdownListProps,
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { SelectInstance } from 'react-select';

export interface AtlusFormDropdownListProps
  extends Omit<AtlusDropdownListProps, 'onChange' | 'onBlur'> {
  name: string;
}

export const AtlusFormDropdownList = forwardRef<SelectInstance, AtlusFormDropdownListProps>(
  function AtlusFormInput({ name, defaultValue, ...rest }, ref) {
    const { control, trigger } = useFormContext();
    const { errors } = useFormState({
      name: name,
      exact: true,
    });

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref, name: name } }) => (
          <AtlusDropdownList
            name={name}
            ref={ref}
            errors={errors}
            defaultValue={value || defaultValue}
            {...rest}
            onChange={(value: string | string[]) => {
              onChange(value);
            }}
            onBlur={() => trigger(name)}
            wrapperClassName="mb-4 md:mb-6"
          />
        )}
      />
    );
  }
);
