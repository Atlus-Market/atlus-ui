import Link from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import clsx from 'clsx';

interface AtlusLinkProps {
  href: string;
  children: ReactNode;
  target?: HTMLAttributeAnchorTarget;
  classNames?: string;
}

export const AtlusLink = ({ href, children, target, classNames }: AtlusLinkProps) => {
  return (
    <Link
      href={href}
      target={target}
      className={clsx('text-orange text-13 font-medium leading-normal', classNames)}
    >
      {children}
    </Link>
  );
};
