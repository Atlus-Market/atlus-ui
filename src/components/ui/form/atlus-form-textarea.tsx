'use client';

import { useFormState } from 'react-hook-form';
import { forwardRef } from 'react';
import { AtlusTextarea, AtlusTextareaProps } from '@/components/ui/textarea/atlus-textarea';

export interface AtlusFormTextareaProps extends AtlusTextareaProps {
}

export const AtlusFormTextarea = forwardRef<HTMLTextAreaElement, AtlusFormTextareaProps>(
  function AtlusFormTextarea({ name, ...rest }, ref) {
    const { errors } = useFormState({
      name: name,
      exact: true
    });

    return <AtlusTextarea {...rest} name={name} ref={ref} errors={errors} />;
  }
);
