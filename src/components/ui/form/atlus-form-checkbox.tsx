'use client';

import { useFormState } from 'react-hook-form';
import { forwardRef } from 'react';
import { AtlusCheckbox, AtlusCheckboxProps } from '@/components/ui/checkbox/atlus-checkbox';

export interface AtlusFormCheckboxProps extends AtlusCheckboxProps {
}

export const AtlusFormCheckbox = forwardRef<HTMLInputElement, AtlusFormCheckboxProps>(
  function AtlusFormCheckbox({ name, ...rest }, ref) {
    const { errors } = useFormState({
      name: name,
      exact: true
    });

    return <AtlusCheckbox {...rest} name={name} ref={ref} errors={errors} />;
  }
);
