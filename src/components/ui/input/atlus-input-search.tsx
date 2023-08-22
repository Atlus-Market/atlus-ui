'use client';

import { HiSearch } from 'react-icons/hi';
import { ChangeEvent, ReactNode, useCallback, useState } from 'react';
import { debounce } from 'lodash';
import clsx from 'clsx';

interface AtlusInputProps {
  placeholder?: string;
  onChange: (text: string) => void;
  searchResults?: ReactNode;
}

export const AtlusInputSearch = ({
                                   placeholder = 'Search',
                                   onChange,
                                   searchResults
                                 }: AtlusInputProps) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(onChange, 200), [onChange]);

  const updateValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debounceFn(event.target.value);
    },
    [debounceFn]
  );

  return (
    <div
      className={clsx(
        'flex items-center border  bg-white rounded-lg px-[18px] min-h-[57px]',
        hasFocus ? 'border-orange' : 'border-lightest-grey'
      )}>
      <HiSearch className='text-middle-grey flex-shrink-0 mr-[10px]' />
      <div className='flex items-center basis-[100%] flex-wrap'>
        {searchResults}
        <input
          type='text'
          placeholder={searchResults ? '' : placeholder}
          className='outline-none text-dark-grey placeholder:text-dark-grey placeholder:text-base caret-orange flex-grow'
          onChange={updateValue}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
      </div>
    </div>
  );
};
