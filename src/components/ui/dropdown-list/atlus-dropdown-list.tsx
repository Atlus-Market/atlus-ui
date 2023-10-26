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
import { ErrorMessage } from '@hookform/error-message';
import { isNullOrUndefined } from '@/utils/type-guard';
import { controls } from '@/components/ui/dropdown-list/controls';

export type ValueOptionType = string | number | boolean;

export interface DropdownOption<T extends ValueOptionType> {
  readonly value: T;
  readonly label: ReactNode;
  readonly data?: Record<string, unknown>;
  options?: Omit<DropdownOption<T>, 'options'>[];
}

const getClassNames = <T extends ValueOptionType>() => ({
  container: () => 'rounded-lg',

  valueContainer: (
    props: ValueContainerProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>
  ) => clsx('text-soft-black text-sm font-normal leading-[16px]', props.isMulti ? 'gap-2' : ''),
  placeholder: () => 'bg-white text-sm font-normal text-dark-grey leading-[16px]',
  input: () => 'text-xs font-medium text-soft-black leading-[16px]',
  menu: () =>
    clsx(
      'rounded-lg border border-solid border-lightest-grey py-[10px]',
      'bg-white shadow-[0px_2px_6px_0px_rgba(164,162,160,0.25)]',
      'mt-[13px]'
    ),
  groupHeading: () => clsx('text-middle-grey text-xs font-medium', 'px-[20px] py-[10px]'),
  option: () => {
    return clsx(
      'px-[20px] py-[10px]',
      'text-soft-black !text-sm font-medium !leading-[17px]',
      'hover:bg-lightest-grey'
    );
  },
});

export interface AtlusDropdownListProps<T extends ValueOptionType> {
  isAsync?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  isOpen?: boolean;
  options: Readonly<DropdownOption<T>[]>;
  value?: T | DropdownOption<T>;
  defaultValue?: DropdownOption<T>['value'];
  name?: string;
  errors?: FieldErrors;
  onChange?: ((value: T) => void) | ((value: T[]) => void);
  onBlur?: () => void;
  leftIcon?: ReactNode;
  label?: string;
  bottomText?: string;
  showDropdownIndicator?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;

  // Components
  groupHeadingHeader?: ReactNode;
  indicatorsExtraCmp?: ReactNode;
  clearIndicator?: ReactNode;
  noOptionsMessage?: ReactNode;
  filterOption?: (options: FilterOptionOption<DropdownOption<T>>, value: string) => boolean;

  // Styles
  size?: 'big' | 'small';
  wrapperClassName?: string;

  innerRef?: Ref<any> | null;
}

export function AtlusDropdownList<T extends ValueOptionType>(props: AtlusDropdownListProps<T>) {
  const {
    isAsync,
    isOpen,
    placeholder,
    options = [],
    value,
    defaultValue,
    name,
    onChange,
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
  } = props;
  const id = useId();

  const memoDefaultValue = useMemo(() => {
    return getDropdownOptions(options, defaultValue);
  }, [defaultValue, options]);

  const dynamicClassNames = useMemo(() => {
    return {
      ...getClassNames<T>(),
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
  }, [isMulti, size]);

  const valueOption = useMemo(() => {
    if (isNullOrUndefined(value)) {
      return undefined;
    }

    if (typeof value === 'object' && 'value' in value) {
      return value;
    }

    return getDropdownOptions(options, value);
  }, [options, value]);

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
        menuIsOpen={isOpen}
        unstyled={true}
        isMulti={isMulti}
        defaultValue={memoDefaultValue}
        options={options}
        isDisabled={isDisabled}
        placeholder={placeholder}
        classNames={dynamicClassNames}
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
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p className="text-red text-xs pl-3">{message}</p>}
          />
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
