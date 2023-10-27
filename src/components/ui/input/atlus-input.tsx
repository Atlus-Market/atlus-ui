'use client';

import { ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { FieldErrors } from 'react-hook-form';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';
import { AtlusFormErrorMessage } from '@/components/ui/form/atlus-form-error-message';

export interface AtlusInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightLabel?: ReactNode;
  wrapperClassName?: string;
  inputClassName?: string;
  errors?: FieldErrors;
  errorNames?: string | string[];
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
    errorNames,
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
          'min-h-[53px]',
          'px-3 py-[7px]',
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
            'flex-grow',
            'disabled:bg-lightest-grey',
            inputClassName
          )}
          ref={ref}
          {...rest}
        />
        {rightIcon && <div className="pr-4 leading-none">{rightIcon}</div>}
      </div>
      {(name || errorNames) && errors && (
        <div className="mt-[5px]">
          <AtlusFormErrorMessage errors={errors} name={errorNames || name} />
        </div>
      )}
    </div>
  );
});
