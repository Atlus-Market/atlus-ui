'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';

export interface AtlusTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  wrapperClassName?: string;
  errors?: FieldErrors;
}

export const AtlusTextarea = forwardRef<HTMLTextAreaElement, AtlusTextareaProps>(
  function AtlusTextarea(
    {
      id,
      label,
      name,
      wrapperClassName,
      errors,
      ...rest
    },
    ref
  ) {
    const textareaId = id || name;
    return (
      <div className={clsx('mb-4 md:mb-6', wrapperClassName)}>
        <div className='flex justify-between items-center'>
          <AtlusFormLabel htmlFor={id} label={label} />
        </div>
        <div className={clsx(
          'border border-light-grey rounded-lg',
          'py-[18px] pl-4 pr-[27px]',
          'flex justify-start items-center'
        )}>
          <textarea
            id={textareaId}
            name={name}
            className={clsx(
              'block w-full',
              'font-normal text-sm md:text-base leading-[17px]',
              'outline-0',
              'placeholder:text-dark-grey',
              'resize-none min-h-[230px]'
            )}
            ref={ref}
            {...rest}
          />
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
