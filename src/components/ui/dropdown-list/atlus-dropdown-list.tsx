'use client';

import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  SingleValue,
  ValueContainerProps,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import clsx from 'clsx';
import { ReactNode, Ref, useId, useMemo } from 'react';
import { FieldErrors } from 'react-hook-form';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { ControlProps } from 'react-select/dist/declarations/src/components/Control';
import { getDropdownOptions } from '@/components/ui/dropdown-list/dropdown.utils';
import { isNullOrUndefined } from '@/utils/type-guard';
import { controls } from '@/components/ui/dropdown-list/controls';
import { AtlusFormErrorMessage } from '@/components/ui/form/atlus-form-error-message';
import { OptionsOrGroups } from 'react-select/dist/declarations/src/types';

export type ValueOptionType = string | number | boolean;

export interface DropdownOption<T extends ValueOptionType> {
  readonly value: T;
  readonly label: ReactNode;
  readonly data?: Record<string, unknown>;
  options?: Omit<DropdownOption<T>, 'options'>[];
}

const getClassNames = <T extends ValueOptionType>(extraClassnames?: ExtraClassnames) => ({
  container: () => 'rounded-lg',

  valueContainer: (
    props: ValueContainerProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>
  ) => clsx('text-soft-black text-sm font-normal leading-[16px]', props.isMulti ? 'gap-2' : ''),
  placeholder: () => 'bg-white text-sm font-normal text-dark-grey leading-[16px]',
  input: () => 'text-xs font-medium text-soft-black leading-[16px]',
  menu: () => {
    return clsx(
      'rounded-lg border border-solid border-lightest-grey py-[10px]',
      'bg-white shadow-[0px_2px_6px_0px_rgba(164,162,160,0.25)]',
      'mt-[13px]',
      extraClassnames?.menu
    );
  },
  groupHeading: () => clsx('text-middle-grey text-xs font-medium', 'px-[20px] py-[10px]'),
  option: () => {
    return clsx(
      'px-[20px] py-[10px]',
      'text-soft-black !text-sm font-medium !leading-17',
      'hover:bg-lightest-grey'
    );
  },
});

export interface CustomSingleComponentProps {
  data?: unknown;
}

export interface CustomMultiComponentProps {
  clearValue: () => void;
  data?: unknown;
}

export interface ExtraClassnames {
  menu?: string;
}

export interface AtlusDropdownListProps<T extends ValueOptionType> {
  isLoading?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  isOpen?: boolean;
  options?: Readonly<DropdownOption<T>[]>;
  defaultOptions?: Readonly<DropdownOption<T>[]>;
  value?: T | DropdownOption<T>;
  defaultValue?: DropdownOption<T>['value'];
  name?: string;
  errors?: FieldErrors;
  onChange?: ((value: T) => void) | ((value: T[]) => void);
  onFocus?: () => void;
  onBlur?: () => void;
  leftIcon?: ReactNode;
  label?: string;
  bottomText?: string;
  showDropdownIndicator?: boolean;
  isDisabled?: boolean;

  // Multi
  isMulti?: boolean;
  customMultiValue?: (props: CustomMultiComponentProps) => ReactNode;
  cacheOptions?: boolean;

  // SingleValue
  singleValue?: (props: CustomSingleComponentProps) => ReactNode;

  // Components
  groupHeadingHeader?: ReactNode;
  indicatorsExtraCmp?: ReactNode;
  clearIndicator?: ReactNode;
  noOptionsMessage?: ReactNode | ((props: { inputValue: string }) => ReactNode);
  filterOption?: (option: FilterOptionOption<DropdownOption<T>>, value: string) => boolean;

  // Async
  isAsync?: boolean;
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsOrGroups<DropdownOption<T>, GroupBase<DropdownOption<T>>>) => void
  ) => Promise<OptionsOrGroups<DropdownOption<T>, GroupBase<DropdownOption<T>>>> | void;

  // Styles
  size?: 'big' | 'small';
  wrapperClassName?: string;
  extraClassnames?: ExtraClassnames;

  innerRef?: Ref<any> | null;
}

export function AtlusDropdownList<T extends ValueOptionType>(props: AtlusDropdownListProps<T>) {
  const {
    isAsync,
    isOpen,
    placeholder,
    options = [],
    defaultOptions,
    value,
    defaultValue,
    name,
    onChange,
    onFocus,
    onBlur,
    wrapperClassName,
    label,
    bottomText,
    filterOption,
    isLoading,
    isSearchable,
    isClearable,
    isMulti = false,
    errors,
    size = 'big',
    isDisabled,
    innerRef,
    loadOptions,
    cacheOptions,
    extraClassnames,
  } = props;
  const id = useId();

  const memoDefaultValue = useMemo(() => {
    return getDropdownOptions(options, defaultValue);
  }, [defaultValue, options]);

  const dynamicClassNames = useMemo(() => {
    return {
      ...getClassNames<T>(extraClassnames),
      control: (props: ControlProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>) => {
        return clsx(
          'px-4 m-0',
          isMulti ? 'py-[7px]' : '',
          size === 'big' ? '!min-h-[53px]' : '!min-h-[48px]',
          'rounded-lg border border-solid',
          props.isFocused ? 'border-orange' : 'border-light-grey'
        );
      },
    };
  }, [extraClassnames, isMulti, size]);

  const valueOption = useMemo(() => {
    /**
     * If it's async, then let react-select handle the correct value.
     */
    if (isNullOrUndefined(value) || isAsync) {
      return undefined;
    }

    if (typeof value === 'object' && 'value' in value) {
      return value;
    }

    return getDropdownOptions(options, value);
  }, [options, value, isAsync]);

  const Comp = isAsync ? AsyncSelect : Select;

  return (
    <div className={wrapperClassName}>
      {label && <AtlusFormLabel label={label} />}
      <Comp
        atlusDropdownProps={props}
        value={valueOption}
        isLoading={isLoading}
        isSearchable={isSearchable}
        id={id}
        instanceId={id}
        ref={innerRef}
        name={name}
        loadOptions={loadOptions}
        menuIsOpen={isOpen}
        unstyled={true}
        isMulti={isMulti}
        cacheOptions={cacheOptions}
        defaultOptions={defaultOptions}
        defaultValue={memoDefaultValue}
        options={options}
        isDisabled={isDisabled}
        placeholder={placeholder}
        classNames={dynamicClassNames}
        onFocus={onFocus}
        onBlur={onBlur}
        isClearable={isClearable}
        filterOption={filterOption}
        onChange={(
          option: MultiValue<DropdownOption<T>> | SingleValue<DropdownOption<T>> | null,
          actionMeta: ActionMeta<DropdownOption<T>>
        ) => {
          if (isMulti) {
            const values = (option as MultiValue<DropdownOption<T>>).map(o => o.value);
            // @ts-ignore
            onChange?.(values);
          } else {
            const value = (option as SingleValue<DropdownOption<T>>)?.value;
            // @ts-ignore
            onChange?.(value);
          }
        }}
        components={controls}
      />
      {name && errors && errors[name] && (
        <div className="mt-[5px]">
          <AtlusFormErrorMessage errors={errors} name={name} />
        </div>
      )}
      {bottomText && (
        <span className="text-xs text-dark-grey font-normal inline-block mt-2 pl-2">
          {bottomText}
        </span>
      )}
    </div>
  );
}
