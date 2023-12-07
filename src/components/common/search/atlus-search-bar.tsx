import { HiSearch } from 'react-icons/hi';
import './search.css';
import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import { ClearInputButton } from '@/app/(main)/search/components/clear-input-button';
import { SearchingPackagesLoader } from '@/app/(main)/search/components/searching-packages-loader';

export const searchPackagesInputID = 'search-packages';

interface AtlusSearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  initialValue?: string;
}

export const AtlusSearchBar = ({ initialValue, onChange, ...restProps }: AtlusSearchBarProps) => {
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
        id={searchPackagesInputID}
        type="search"
        inputMode="search"
        className={clsx(
          'placeholder:text-dark-grey',
          'text-13 md:text-sm',
          'outline-none',
          ' text-soft-black font-inter leading-normal bg-lightest-grey outline-0',
          'w-full'
        )}
        {...restProps}
      />
      <SearchingPackagesLoader />
      <ClearInputButton />
    </div>
  );
};
