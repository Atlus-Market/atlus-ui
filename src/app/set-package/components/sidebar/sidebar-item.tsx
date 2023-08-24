import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

interface SideBarItemProps {
  text: string;
  itemNumber: number;
  isActive: boolean;
  href: string;
  disabled?: boolean;
}

const LinkWrapper = ({ href, children, disabled }: SideBarItemProps & { children: ReactNode }) => {
  if (disabled) {
    return <>{children}</>;
  }
  return (
    <Link href={href} className='block'>
      {children}
    </Link>
  );
};

export const SidebarItem = (props: SideBarItemProps) => {
  const { text, itemNumber, isActive, href, disabled } = props;
  return (
    <LinkWrapper {...props}>
      <div className={clsx(
        'px-4 pt-[14px] pb-[13px]',
        'rounded-lg leading-none',
        isActive ? 'bg-off-white' : 'bg-white'
      )}>
        <div className={clsx(
          'text-sm font-medium leading-none select-none',
          isActive ? 'text-orange' : disabled ? 'text-light-grey' : 'text-[#85807B]'
        )}>
          <span className='inline-block mr-5 font-bold leading-4'>{itemNumber}.</span>
          <span className='leading-[18px]'>{text}</span>
        </div>
      </div>
    </LinkWrapper>
  );
};
