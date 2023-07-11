'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';

export interface AtlusInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightLabel?: ReactNode;
  wrapperClassName?: string;
  errors?: FieldErrors;
  rightIcon?: ReactNode;
}

export const AtlusInput = forwardRef<HTMLInputElement, AtlusInputProps>(
  function AtlusInput(
    { id, label, name, wrapperClassName, errors, rightIcon, rightLabel, ...rest },
    ref
  ) {
    const inputId = id || name;
    return (
      <div className={clsx('mb-4 md:mb-6', wrapperClassName)}>
        <div className="flex justify-between items-center">
          <label
            htmlFor={inputId}
            className='text-xs md:text-sm leading-[17px] font-medium'>
            {label}
          </label>
          {rightLabel}
        </div>
        <div className={clsx(
          'border border-light-grey rounded-lg',
          'py-[16px] md:py-[19px] px-4 mt-2',
          'flex justify-start items-center'
        )}>
          <input
            id={inputId}
            name={name}
            className={clsx(
              'block w-full',
              'font-normal text-sm md:text-base leading-[17px]',
              'outline-0',
              'placeholder:text-dark-grey'
            )}
            ref={ref}
            {...rest}
          />
          {rightIcon &&
            <div>
              {rightIcon}
            </div>
          }
        </div>
        {name && (
          <div className='mt-[5px]'>
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className='text-red text-xs pl-3'>{message}</p>
              )}
            />
          </div>
        )}
      </div>
    );
  }
);
