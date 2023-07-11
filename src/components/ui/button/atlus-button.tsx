'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { AtlusColor } from '@/components/ui/theme';

export type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends HtmlButtonProps {
  variant?: 'clear' | 'solid';
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  color?: AtlusColor;
}

const baseButton = clsx(
  'font-bold leading-[22px]',
  'text-[15px] md:text-lg',
  'inline-flex justify-center items-center'
);

const solidVariant = clsx(
  baseButton,
  'min-w-[200px]',
  'bg-orange text-white rounded-[53px]',
  'px-8 md:px-9',
  'py-[13px] md:py-[15px]'
);

const clearVariant = ({ variant, color }: ButtonProps) => {
  const isClearVariant = variant === 'clear';
  return clsx(
    baseButton,
    'text-dark-grey',
    isClearVariant && color === 'orange' ? 'bg-none text-orange' : '',
  );
};

export const AtlusButton = (props: ButtonProps) => {
  const {
    variant = 'solid',
    children,
    type = 'button',
    isLoading = false,
    disabled = false,
    color,
    className,
    ...restProps
  } = props;
  const isClearVariant = variant === 'clear';
  const classVariant = isClearVariant ? clearVariant(props) : solidVariant;
  return (
    <button
      type={type}
      className={clsx(
        classVariant,
        className,
        isClearVariant && color,
        disabled ? 'opacity-70' : 'opacity-1'
      )}
      disabled={isLoading || disabled}
      {...restProps}
    >
      {isLoading ? <AtlusLoadingSpinner /> : children}
    </button>
  );
};
