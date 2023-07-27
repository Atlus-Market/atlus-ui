'use client';

import Select, { ActionMeta, components, GroupBase, SelectInstance } from 'react-select';
import clsx from 'clsx';
import { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { generateID } from '@/utils/id';


export interface DropdownOption {
  readonly value: string;
  readonly label: ReactNode;
  options?: Omit<DropdownOption, 'options'>[];
}

const classNames = {
  container: () => 'rounded-lg',
  control: () => clsx(
    'px-4 py-[16px] m-0',
    'rounded-lg border border-solid border-lightest-grey'
  ),
  valueContainer: () => 'text-soft-black text-sm font-normal leading-[15px]',
  placeholder: () => 'bg-white text-xs font-medium text-middle-grey leading-[15px]',
  input: () => 'text-xs font-medium text-soft-black leading-[15px]',
  menu: () => clsx(
    'rounded-lg border border-solid border-lightest-grey py-[10px]',
    'bg-white shadow-[0px_2px_6px_0px_rgba(164,162,160,0.25)]',
    'mt-[13px]'
  ),
  groupHeading: () => clsx(
    'text-middle-grey text-xs font-medium',
    'px-[20px] py-[10px]'
  ),
  option: () => {
    return clsx(
      'px-[20px] py-[10px]',
      'text-soft-black !text-sm font-medium !leading-[17px]',
      'hover:bg-lightest-grey'
    );
  }
};

export interface AtlusDropdownListProps {
  wrapperClassName?: string;
  placeholder?: string;
  isOpen?: boolean;
  options: DropdownOption[];
  defaultValue?: DropdownOption['value'];
  name?: string;
  errors?: FieldErrors;
  onChange?: (value: string) => void;
  leftIcon?: ReactNode;
}

export const AtlusDropdownList = forwardRef<
  SelectInstance<DropdownOption, false, GroupBase<DropdownOption>>, AtlusDropdownListProps
>(
  function AtlusDropdownList(
    {
      isOpen,
      placeholder,
      options = [],
      defaultValue,
      name,
      onChange,
      wrapperClassName,
      leftIcon
    },
    ref
  ) {

    const refId = useRef<string>('');
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
      setHydrated(true);
    }, []);

    if (!hydrated) {
      // Returns null on first render, so the client and server match
      return null;
    }

    refId.current = refId.current || generateID();

    return (
      <div className={clsx('mb-4 md:mb-6', wrapperClassName)}>
        <Select
          id={refId.current}
          instanceId={refId.current}
          ref={ref}
          name={name}
          menuIsOpen={isOpen}
          unstyled={true}
          isMulti={false}
          defaultValue={options.find(o => o.value === defaultValue)}
          options={options}
          placeholder={placeholder}
          classNames={classNames}
          onChange={(option: DropdownOption | null, actionMeta: ActionMeta<DropdownOption>) => {
            const value = option?.value ?? '';
            onChange?.(value);
          }}
          components={{
            Control: ({ children, ...rest }) => (
              <components.Control {...rest}>
                {leftIcon && <div className='inline-block mr-3'>{leftIcon}</div>}
                {children}
              </components.Control>
            )
          }}
        />
      </div>
    );
  });
