'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { AtlusColor } from '@/components/ui/theme';
import { geologica } from '@/components/ui/theme/fonts';

export type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export interface AtlusButtonProps extends HtmlButtonProps {
  variant?: 'clear' | 'solid' | 'outline';
  size?: 'small' | 'medium' | 'big';
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  color?: AtlusColor;
}

const baseButton = clsx('inline-flex justify-center items-center', geologica.className);

const solidOrangeVariant = clsx(
  baseButton,
  'bg-orange text-white font-bold rounded-[32px]',
  'hover:bg-[#F15F4C] active:bg-[#DC422D]',
  'disabled:bg-middle-grey'
);

const clearVariant = ({ variant, color }: AtlusButtonProps) => {
  const isClearVariant = variant === 'clear';
  return clsx(
    baseButton,
    'text-dark-grey font-medium',
    isClearVariant && color === 'orange' ? 'bg-none text-orange' : '',
    'hover:text-[#F15F4C] active:text-[#DC422D]',
    'disabled:bg-transparent'
  );
};

const outlineWhiteVariant = clsx(
  baseButton,
  'bg-white font-bold',
  'border border-soft-black rounded-[32px]',
  'hover:bg-[#FCFCFC] active:bg-[#F5F5F5]',
  'disabled:bg-middle-grey'
);

// small/mobile
const smallSizeClasses = 'min-w-[100px] py-[10px] px-6 text-[13px] leading-[16px]';

// medium size
const mediumSizeClasses = 'md:min-w-[180px] md:py-[13px] md:px-9 md:text-[15px] md:leading-[17px]';

// big md screen or bigger
const bigSizeClasses = 'md:min-w-[200px] md:py-[15px] md:px-9 md:text-lg md:leading-[23px]';

const getButtonSize = (props: AtlusButtonProps): string => {
  const { variant, size } = props;
  if (variant === 'clear') {
    return '';
  }

  if (size === 'small') {
    return smallSizeClasses;
  }

  if (size === 'medium') {
    return mediumSizeClasses;
  }

  if (size === 'big') {
    return bigSizeClasses;
  }

  const isOutlineVariant = variant === 'outline';

  // responsive size
  return clsx(
    // small/mobile
    smallSizeClasses,

    // big
    isOutlineVariant ? mediumSizeClasses : bigSizeClasses
  );
};

const getLoadingSpinnerColor = ({ variant }: AtlusButtonProps) => {
  if (variant === 'clear') {
    return '#a4a2a0';
  }

  return '';
};

export const AtlusButton = forwardRef<HTMLButtonElement, AtlusButtonProps>(function AtlusButton(
  props,
  ref
) {
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
  const classVariant = isClearVariant
    ? clearVariant(props)
    : variant === 'solid'
    ? solidOrangeVariant
    : outlineWhiteVariant;
  return (
    <button
      type={type}
      className={clsx(classVariant, className, getButtonSize(props), isClearVariant && color)}
      disabled={isLoading || disabled}
      ref={ref}
      {...restProps}
    >
      {isLoading ? <AtlusLoadingSpinner hexColor={getLoadingSpinnerColor(props)} /> : children}
    </button>
  );
});
