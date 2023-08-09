'use client';

import Select, {
  ActionMeta,
  components,
  GroupBase,
  MultiValue,
  SelectInstance,
  SingleValue,
  ValueContainerProps
} from 'react-select';
import AsyncSelect from 'react-select/async';
import clsx from 'clsx';
import { forwardRef, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { generateID } from '@/utils/id';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { ControlProps } from 'react-select/dist/declarations/src/components/Control';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { AtlusTagRemoveButton } from '@/components/ui/tag/atlus-tag-remove-button';
import { getDropdownOptions } from '@/components/ui/dropdown-list/dropdown.utils';


export interface DropdownOption {
  readonly value: string;
  readonly label: ReactNode;
  readonly data?: Record<string, unknown>;
  options?: Omit<DropdownOption, 'options'>[];
}

const classNames = {
  container: () => 'rounded-lg',

  valueContainer: (props: ValueContainerProps<DropdownOption, boolean, GroupBase<DropdownOption>>) => clsx(
    'text-soft-black text-sm font-normal leading-[16px]',
    props.isMulti ? 'gap-2' : ''
  ),
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
  isClearable?: boolean;
  wrapperClassName?: string;
  placeholder?: string;
  isOpen?: boolean;
  options: DropdownOption[];
  value?: DropdownOption;
  defaultValue?: DropdownOption['value'];
  name?: string;
  errors?: FieldErrors;
  onChange?: (value: string | string[]) => void;
  leftIcon?: ReactNode;
  label?: string;
  bottomText?: string;
  showDropdownIndicator?: boolean;
  isMulti?: boolean;

  // Components
  groupHeadingHeader?: ReactNode;
  indicatorsExtraCmp?: ReactNode;
  clearIndicator?: ReactNode;
  noOptionsMessage?: ReactNode;
  filterOption?: (x: FilterOptionOption<DropdownOption>, y: string) => boolean;
}

export const AtlusDropdownList = forwardRef<
  SelectInstance<DropdownOption, true | false, GroupBase<DropdownOption>>, AtlusDropdownListProps
>(
  function AtlusDropdownList(
    {
      isAsync,
      isOpen,
      placeholder,
      options = [],
      value,
      defaultValue,
      name,
      onChange,
      wrapperClassName,
      leftIcon,
      label,
      bottomText,
      groupHeadingHeader,
      indicatorsExtraCmp,
      clearIndicator,
      showDropdownIndicator,
      filterOption,
      isLoading,
      isSearchable,
      isClearable,
      noOptionsMessage,
      isMulti = false
    },
    ref
  ) {

    const refId = useRef<string>('');
    const [hydrated, setHydrated] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const memoDefaultValue = useMemo(() => {
      return getDropdownOptions(options, defaultValue);
    }, [defaultValue, options]);

    useEffect(() => {
      setHydrated(true);
    }, []);

    const dynamicClassNames = useMemo(() => {
      return {
        ...classNames,
        control: (props: ControlProps<DropdownOption, boolean, GroupBase<DropdownOption>>) => {
          return clsx(
            'px-4 !min-h-[53px] m-0',
            'rounded-lg border border-solid',
            isFocused ? 'border-orange' : 'border-light-grey'
          );
        }
      };
    }, [isFocused]);

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
          value={value}
          isLoading={isLoading}
          isSearchable={isSearchable}
          id={refId.current}
          instanceId={refId.current}
          ref={ref}
          name={name}
          menuIsOpen={isOpen}
          unstyled={true}
          isMulti={isMulti}
          defaultValue={memoDefaultValue}
          options={options}
          placeholder={placeholder}
          classNames={dynamicClassNames}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMenuClose={() => setIsFocused(false)} // onBlur is not called when selecting an option
          isClearable={isClearable}
          filterOption={filterOption}
          onChange={(option: MultiValue<DropdownOption> | SingleValue<DropdownOption> | null, actionMeta: ActionMeta<DropdownOption>) => {
            if (isMulti) {
              const values = (option as MultiValue<DropdownOption>).map(o => o.value);
              onChange?.(values);
            } else {
              const value = (option as SingleValue<DropdownOption>)?.value ?? '';
              onChange?.(value);
            }
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
            ),
            IndicatorsContainer: ({ children, ...rest }) => {
              // Renders CleanIndicator & DropdownIndicator
              return (
                <components.IndicatorsContainer {...rest}>
                  {indicatorsExtraCmp}
                  {children}
                </components.IndicatorsContainer>
              );
            },
            DropdownIndicator: ({ children, ...rest }) => {
              return (
                <components.DropdownIndicator {...rest}>
                  {showDropdownIndicator ? children : <div />}
                </components.DropdownIndicator>
              );
            },
            ClearIndicator: ({ children, ...rest }) => {
              if (isMulti) {
                return null;
              }
              return (
                <components.ClearIndicator {...rest}>
                  {clearIndicator ? clearIndicator : children}
                </components.ClearIndicator>
              );
            },
            NoOptionsMessage: ({ children, ...rest }) => {
              return (
                <components.NoOptionsMessage {...rest}>
                  {noOptionsMessage ? noOptionsMessage : children}
                </components.NoOptionsMessage>
              );
            },
            IndicatorSeparator: () => null,
            MultiValue: ({ children, ...rest }) => {
              return (
                <components.MultiValue {...rest}>
                  <AtlusTag text={children as string} className='!pr-0 !rounded-r-[0]' />
                </components.MultiValue>
              );
            },
            MultiValueRemove: ({ children, ...rest }) => {
              return (
                <components.MultiValueRemove {...rest}>
                  <AtlusTagRemoveButton classNames='!rounded-l-[0] pr-[12px] h-full' />
                </components.MultiValueRemove>
              );
            }
          }}
        />
        {bottomText &&
          <span className='text-xs text-dark-grey font-semibold inline-block mt-2 pl-2'>
          {bottomText}
      </span>
        }
      </div>
    );
  });
