'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { AtlusColor } from '@/components/ui/theme';

export type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends HtmlButtonProps {
  variant?: 'clear' | 'solid' | 'outline';
  size?: 'big' | 'medium';
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  color?: AtlusColor;
}

const baseButton = clsx(
  'inline-flex justify-center items-center',
  'active:opacity-95'
);

const solidVariant = clsx(
  baseButton,
  'bg-orange text-white rounded-[32px]'
);

const clearVariant = ({ variant, color }: ButtonProps) => {
  const isClearVariant = variant === 'clear';
  return clsx(
    baseButton,
    'text-dark-grey',
    isClearVariant && color === 'orange' ? 'bg-none text-orange' : ''
  );
};

const outlineVariant = clsx(
  baseButton,
  'bg-white',
  'border border-soft-black rounded-[32px]'
);

const getButtonSize = (props: ButtonProps): string => {
  const { variant, size } = props;
  if (variant === 'clear') {
    return '';
  }

  if (size === 'medium') {
    return clsx(
      'min-w-[100px] py-[10px] px-6',
      'text-[13px] font-bold leading-[16px]'
    );
  }

  // big
  return clsx(
    'min-w-[200px] py-[15px] px-9',
    'text-lg font-bold leading-[23px]'
  );
};

export const AtlusButton = (props: ButtonProps) => {
  const {
    variant = 'solid',
    size = 'big',
    children,
    type = 'button',
    isLoading = false,
    disabled = false,
    color,
    className,
    ...restProps
  } = props;
  const isClearVariant = variant === 'clear';
  const classVariant = isClearVariant ? clearVariant(props) : variant === 'solid' ? solidVariant : outlineVariant;
  return (
    <button
      type={type}
      className={clsx(
        classVariant,
        className,
        getButtonSize(props),
        isClearVariant && color,
        disabled ? '!bg-middle-grey' : ''
      )}
      disabled={isLoading || disabled}
      {...restProps}
    >
      {isLoading ? <AtlusLoadingSpinner /> : children}
    </button>
  );
};
