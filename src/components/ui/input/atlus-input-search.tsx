'use client';

import { HiSearch } from 'react-icons/hi';
import { ChangeEvent, ReactNode, useCallback } from 'react';
import { debounce } from 'lodash';

interface AtlusInputProps {
  placeholder?: string;
  onChange: (text: string) => void;
  searchResults?: ReactNode;
}

export const AtlusInputSearch = ({
  placeholder = 'Search',
  onChange,
  searchResults,
}: AtlusInputProps) => {
  const debounceFn = useCallback(debounce(onChange, 200), [onChange]);

  const updateValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debounceFn(event.target.value);
    },
    [debounceFn]
  );

  return (
    <div className="flex items-center border border-lightest-grey bg-white rounded-lg px-[18px] min-h-[57px]">
      <HiSearch className="text-middle-grey flex-shrink-0" />
      <div className="ml-3 mr-1">{searchResults}</div>
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none text-dark-grey placeholder:text-dark-grey placeholder:text-base w-full"
        onChange={updateValue}
      />
    </div>
  );
};
