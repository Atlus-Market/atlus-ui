import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';

interface AtlusLinkProps {
  href: string;
  children: ReactNode;
  target?: HTMLAttributeAnchorTarget;
}

export const AtlusLink = ({ href, children, target }: AtlusLinkProps) => {
  return (
    <Link
      href={href}
      target={target}
      className='text-orange text-[11px] font-medium leading-normal'>
      {children}
    </Link>
  );
};
