'use client';

import Select from 'react-select';
import clsx from 'clsx';
import { ReactNode } from 'react';

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
    'shadow-[0px_2px_6px_0px_rgba(164,162,160,0.25)]',
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

interface AtlusDropdownListProps {
  placeholder?: string;
  isOpen?: boolean;
  options: DropdownOption[];
  defaultValue?: DropdownOption;
}

export const AtlusDropdownList = ({ isOpen, placeholder, options = [], defaultValue }: AtlusDropdownListProps) => {
  return (
    <Select
      menuIsOpen={isOpen}
      unstyled={true}
      isMulti={false}
      defaultValue={defaultValue}
      options={options}
      placeholder={placeholder}
      classNames={classNames}
    />
  );
};
