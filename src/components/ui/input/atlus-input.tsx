'use client';

import { ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';

export interface AtlusInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightLabel?: ReactNode;
  wrapperClassName?: string;
  inputClassName?: string;
  errors?: FieldErrors;
  rightIcon?: ReactNode;
  leftCmp?: ReactNode;
}

export const AtlusInput = forwardRef<HTMLInputElement, AtlusInputProps>(function AtlusInput(
  {
    id,
    label,
    name,
    wrapperClassName,
    inputClassName,
    errors,
    rightIcon,
    rightLabel,
    leftCmp,
    ...rest
  },
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputId = id || name;
  return (
    <div className={clsx('mb-4 md:mb-6', wrapperClassName)}>
      <div className="flex justify-between items-center">
        <AtlusFormLabel htmlFor={inputId} label={label} />
        {rightLabel}
      </div>
      <div
        className={clsx(
          'border border-light-grey rounded-lg',
          'flex justify-start items-center flex-wrap gap-2',
          'overflow-hidden',
          'p-3',
          '[&:has(input:focus)]:border-orange',
          '[&:has(input[disabled])]:bg-lightest-grey'
        )}
      >
        {leftCmp}
        <input
          id={inputId}
          name={name}
          className={clsx(
            'block',
            'font-normal text-sm leading-[17px]',
            'outline-0',
            'placeholder:text-dark-grey',
            'py-[5px] flex-grow',
            'disabled:bg-lightest-grey',
            inputClassName
          )}
          ref={ref}
          {...rest}
        />
        {rightIcon && <div className="pr-4 leading-none">{rightIcon}</div>}
      </div>
      {name && errors && (
        <div className="mt-[5px]">
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p className="text-red text-xs pl-3">{message}</p>}
          />
        </div>
      )}
    </div>
  );
});
