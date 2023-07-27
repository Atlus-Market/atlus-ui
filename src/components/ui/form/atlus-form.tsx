'use client';

import { FieldValues, FormProvider, SubmitHandler } from 'react-hook-form';
import { FormHTMLAttributes, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form/dist/types/form';
import { noop } from '@/utils/noop';

interface AtlusFormProps<TFieldValues extends FieldValues> {
  children: ReactNode;
  htmlFormProps?: FormHTMLAttributes<HTMLFormElement>;

  // Receives the form values
  onSubmit?: SubmitHandler<TFieldValues>;

  formProps: UseFormReturn<TFieldValues>;
  className?: string;
}

export const AtlusForm = <T extends FieldValues>({
                                                   className,
                                                   children,
                                                   onSubmit = noop,
                                                   htmlFormProps,
                                                   formProps
                                                 }: AtlusFormProps<T>) => {
  return (
    <FormProvider {...formProps}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          return formProps.handleSubmit(onSubmit)(e);
        }}
        noValidate={true}
        className={className}
        {...htmlFormProps}
      >
        {children}
        <input type='submit' hidden />
      </form>
    </FormProvider>
  );
};
