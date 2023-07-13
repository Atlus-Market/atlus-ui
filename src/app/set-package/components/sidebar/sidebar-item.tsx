import clsx from 'clsx';
import Link from 'next/link';

interface SideBarItemProps {
  text: string;
  itemNumber: number;
  isActive: boolean;
  href: string;
}

export const SidebarItem = ({ text, itemNumber, isActive, href }: SideBarItemProps) => {
  return (
    <Link href={href} className='block'>
      <div className={clsx(
        'px-4 pt-[14px] pb-[13px]',
        'rounded-lg leading-none',
        isActive ? 'bg-off-white' : 'bg-white'
      )}>
        <div className={clsx(
          'text-sm font-medium leading-none',
          isActive ? 'text-orange' : 'text-[#85807B]'
        )}>
          <span className='inline-block mr-5 font-bold leading-4'>{itemNumber}.</span>
          <span className='leading-[18px]'>{text}</span>
        </div>
      </div>
    </Link>
  );
};
