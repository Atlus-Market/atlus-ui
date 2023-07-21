import { HTMLProps, useEffect, useRef } from 'react';

import './styles.css';

interface AtlusCheckboxProps extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
  label?: string;
}

export const AtlusCheckbox = ({
                                indeterminate,
                                className = '',
                                checked,
                                label,
                                ...rest
                              }: AtlusCheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate, checked]);

  return (
    <div className='checkbox-wrapper'>
      <label>
        <input
          ref={ref}
          checked={checked}
          type='checkbox'
          {...rest}
        />
        {label && <span>{label}</span>}
      </label>
    </div>
  );
};
