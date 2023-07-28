import { forwardRef, HTMLProps, useEffect, useRef } from 'react';

import './styles.css';
import { FieldErrors } from 'react-hook-form';
import clsx from 'clsx';

export interface AtlusCheckboxProps extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
  wrapperClassName?: string;
  label?: string;
  errors?: FieldErrors;
}


export const AtlusCheckbox = forwardRef<HTMLInputElement, AtlusCheckboxProps>(
  function AtlusCheckbox(
    {
      indeterminate,
      className = '',
      wrapperClassName,
      checked = false,
      label,
      ...rest
    }: AtlusCheckboxProps,
    ref
  ) {

    const indeterminateRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (typeof indeterminate === 'boolean' && indeterminateRef.current) {
        indeterminateRef.current.indeterminate = !checked && indeterminate;
      }
    }, [ref, indeterminate, checked]);

    return (
      <div className={clsx(
        'checkbox-wrapper',
        wrapperClassName
      )}>
        <label className='flex items-center'>
          <input
            {...rest}
            checked={checked}
            type='checkbox'
            ref={e => {
              indeterminateRef.current = e;
              if (typeof ref === 'function') {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
            }}
          />
          {label && <span className='inline-block ml-[15px]'>{label}</span>}
        </label>
      </div>
    )
      ;
  });
