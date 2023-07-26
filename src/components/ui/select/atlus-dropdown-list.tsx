'use client';

import Select, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import clsx from 'clsx';

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' }
];

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10
  }
});

const colourStyles: StylesConfig<ColourOption> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined
      }
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
};

interface AtlusDropdownListProps {
  placeholder?: string;
}

export const AtlusDropdownList = ({ placeholder }: AtlusDropdownListProps) => {

  return (
    <div>
      <Select
        menuIsOpen={true}
        unstyled={true}
        isMulti={false}
        // defaultValue={colourOptions[2]}
        options={colourOptions}
        placeholder={placeholder}
        classNames={{
          control: () => 'px-0 py-0 m-0',
          valueContainer: () => 'px-[20px] py-[10px]',
          placeholder: () => 'bg-white text-xs font-medium text-middle-grey',
          option: (props) => {
            return clsx(
              'px-[20px] py-[10px]',
              'text-soft-black !text-sm font-medium !leading-[17px]',
              'hover:bg-lightest-grey'
            );
          }
        }
        }
      />
    </div>
  );
};
