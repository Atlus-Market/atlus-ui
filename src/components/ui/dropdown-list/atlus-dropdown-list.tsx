'use client';

import Select, { ActionMeta, components, GroupBase, SelectInstance } from 'react-select';
import AsyncSelect from 'react-select/async';
import clsx from 'clsx';
import { forwardRef, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { generateID } from '@/utils/id';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { ControlProps } from 'react-select/dist/declarations/src/components/Control';


export interface DropdownOption {
  readonly value: string;
  readonly label: ReactNode;
  readonly data?: Record<string, unknown>;
  options?: Omit<DropdownOption, 'options'>[];
}

const classNames = {
  container: () => 'rounded-lg',
  control: (props: ControlProps<DropdownOption, false, GroupBase<DropdownOption>>) => {
    return clsx(
      'px-4 py-[16px] m-0',
      'rounded-lg border border-solid border-light-grey'
    );
  },
  valueContainer: () => 'text-soft-black text-sm font-normal leading-[16px]',
  placeholder: () => 'bg-white text-xs font-medium text-middle-grey leading-[16px]',
  input: () => 'text-xs font-medium text-soft-black leading-[16px]',
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
  isAsync?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  wrapperClassName?: string;
  placeholder?: string;
  isOpen?: boolean;
  options: DropdownOption[];
  defaultValue?: DropdownOption['value'];
  name?: string;
  errors?: FieldErrors;
  onChange?: (value: string) => void;
  leftIcon?: ReactNode;
  label?: string;
  bottomText?: string;

  // Components
  groupHeadingHeader?: ReactNode;
  filterOption?: (x: FilterOptionOption<DropdownOption>, y: string) => boolean;
}

export const AtlusDropdownList = forwardRef<
  SelectInstance<DropdownOption, false, GroupBase<DropdownOption>>, AtlusDropdownListProps
>(
  function AtlusDropdownList(
    {
      isAsync,
      isOpen,
      placeholder,
      options = [],
      defaultValue,
      name,
      onChange,
      wrapperClassName,
      leftIcon,
      label,
      bottomText,
      groupHeadingHeader,
      filterOption,
      isLoading,
      isSearchable
    },
    ref
  ) {

    const refId = useRef<string>('');
    const [hydrated, setHydrated] = useState(false);


    const memoDefaultValue = useMemo(() => {
      if (!options) {
        return undefined;
      }

      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        let optionFound = undefined;
        if (!option.options) {
          optionFound = option.value === defaultValue ? option : undefined;
        } else {
          optionFound = option.options.find(oo => oo.value === defaultValue);
        }
        if (optionFound) {
          return optionFound;
        }
      }
    }, [defaultValue, options]);

    useEffect(() => {
      setHydrated(true);
    }, []);

    if (!hydrated) {
      // Returns null on first render, so the client and server match
      return null;
    }

    refId.current = refId.current || generateID();

    const Comp = isAsync ? AsyncSelect : Select;

    return (
      <div className={clsx('mb-4 md:mb-6', wrapperClassName)}>
        {label && <AtlusFormLabel label={label} />}
        <Comp
          isLoading={isLoading}
          isSearchable={isSearchable}
          id={refId.current}
          instanceId={refId.current}
          ref={ref}
          name={name}
          menuIsOpen={isOpen}
          unstyled={true}
          isMulti={false}
          defaultValue={memoDefaultValue}
          options={options}
          placeholder={placeholder}
          classNames={classNames}
          filterOption={filterOption}
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
            ),
            GroupHeading: ({ children, ...rest }) => (
              <components.GroupHeading {...rest}>
                {groupHeadingHeader}
                {children}
              </components.GroupHeading>
            )
          }}
        />
        {bottomText &&
          <span className='text-xs text-dark-grey font-normal inline-block mt-2'>
            {bottomText}
          </span>
        }
      </div>
    );
  });
