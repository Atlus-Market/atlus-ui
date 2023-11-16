'use client';

import { HiOutlineX, HiSearch } from 'react-icons/hi';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import './search.css';
import clsx from 'clsx';
import { ChangeEvent, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

interface AtlusSearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  initialValue?: string;
}

export const AtlusSearchBar = ({ initialValue, onChange, ...restProps }: AtlusSearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const ref = useRef<HTMLInputElement | null>(null);
  const hasInputValue = inputValue.length > 0;

  useEffect(() => {
    if (ref.current && initialValue) {
      ref.current.value = initialValue;
      setInputValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      setInputValue(event.target.value);
    }, 200),
    [onChange]
  );

  const updateValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debounceFn(event);
    },
    [debounceFn]
  );

  const clearInput = useCallback(() => {
    if (ref.current) {
      ref.current.value = '';
      setInputValue('');
    }
  }, []);

  return (
    <div
      className={clsx(
        'flex items-center bg-lightest-grey rounded-xl gap-3',
        'px-3 md:px-4',
        'w-full md:max-w-[640px] min-h-[40px] md:min-h-[54px]'
      )}
    >
      <HiSearch className="text-middle-grey text-[20px]" />
      <input
        type="search"
        inputMode="search"
        className={clsx(
          'placeholder:text-dark-grey',
          'text-13 md:text-sm',
          ' text-soft-black font-inter leading-normal bg-lightest-grey outline-0',
          'w-full'
        )}
        ref={ref}
        {...restProps}
        onChange={updateValue}
      />
      {hasInputValue && (
        <AtlusButton
          className="atlus-btn-22"
          iconOnlyIcon={<HiOutlineX className="text-middle-grey text-[20px]" />}
          variant="icon-only"
          color="grey"
          onClick={clearInput}
          type="button"
        />
      )}
    </div>
  );
};
