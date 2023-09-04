'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { AtlusColor } from '@/components/ui/theme';
import { geologica } from '@/components/ui/theme/fonts';

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
  geologica.className
);

const solidOrangeVariant = clsx(
  baseButton,
  'bg-orange text-white rounded-[32px]',
  'hover:bg-[#F15F4C] active:bg-[#DC422D]',
  'disabled:bg-middle-grey'
);

const clearVariant = ({ variant, color }: AtlusButtonProps) => {
  const isClearVariant = variant === 'clear';
  return clsx(
    baseButton,
    'text-dark-grey',
    isClearVariant && color === 'orange' ? 'bg-none text-orange' : '',
    'hover:text-[#F15F4C] active:text-[#DC422D]',
    'disabled:bg-transparent'
  );
};

const outlineWhiteVariant = clsx(
  baseButton,
  'bg-white',
  'border border-soft-black rounded-[32px]',
  'hover:bg-[#FCFCFC] active:bg-[#F5F5F5]',
  'disabled:bg-middle-grey'
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

const getLoadingSpinnerColor = ({ variant }: AtlusButtonProps) => {
  if (variant === 'clear') {
    return '#a4a2a0';
  }

  return '';
};

export const AtlusButton = forwardRef<HTMLButtonElement, AtlusButtonProps>(
  function AtlusButton(props, ref) {
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
    const classVariant = isClearVariant
      ? clearVariant(props)
      : variant === 'solid'
      ? solidOrangeVariant
      : outlineWhiteVariant;
    return (
      <button
        type={type}
        className={clsx(
          classVariant,
          className,
          getButtonSize(props),
          isClearVariant && color
        )}
        disabled={isLoading || disabled}
        ref={ref}
        {...restProps}
      >
        {isLoading ? <AtlusLoadingSpinner hexColor={getLoadingSpinnerColor(props)} /> : children}
      </button>
    );
  }
);
