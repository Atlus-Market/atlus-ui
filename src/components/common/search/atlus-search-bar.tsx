import { HiOutlineX, HiSearch } from 'react-icons/hi';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import './search.css';
import clsx from 'clsx';

interface AtlusSearchBarProps {
  placeholder?: string;
}

export const AtlusSearchBar = ({ placeholder }: AtlusSearchBarProps) => {
  return (
    <div
      className={clsx(
        'flex items-center bg-lightest-grey rounded-xl  gap-3',
        'px-3 py-[10px] md:px-4 md:py-[15px]',
        'w-full md:max-w-[640px]'
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
        placeholder={placeholder}
      />
      <AtlusButton
        className="atlus-btn-22"
        iconOnlyIcon={<HiOutlineX className="text-middle-grey text-[20px]" />}
        variant="icon-only"
        color="grey"
      />
    </div>
  );
};
