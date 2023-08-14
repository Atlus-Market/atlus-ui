'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { AtlusColor } from '@/components/ui/theme';

export type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export interface AtlusButtonProps extends HtmlButtonProps {
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

const solidOrangeVariant = clsx(
  baseButton,
  'bg-orange text-white rounded-[32px]',
  'hover:bg-[#F15F4C] active:bg-[#DC422D]'
);

const clearVariant = ({ variant, color }: AtlusButtonProps) => {
  const isClearVariant = variant === 'clear';
  return clsx(
    baseButton,
    'text-dark-grey',
    isClearVariant && color === 'orange' ? 'bg-none text-orange' : '',
    'hover:text-[#F15F4C] active:text-[#DC422D]'
  );
};

const outlineWhiteVariant = clsx(
  baseButton,
  'bg-white',
  'border border-soft-black rounded-[32px]',
  'hover:bg-[#FCFCFC] active:bg-[#F5F5F5]'
);

const getButtonSize = (props: AtlusButtonProps): string => {
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

export const AtlusButton = (props: AtlusButtonProps) => {
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
  const classVariant = isClearVariant ? clearVariant(props) : variant === 'solid' ? solidOrangeVariant : outlineWhiteVariant;
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
