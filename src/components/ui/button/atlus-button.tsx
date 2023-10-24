import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { AtlusColor } from '@/components/ui/theme';

export type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export interface AtlusButtonProps extends HtmlButtonProps {
  variant?: 'clear' | 'solid' | 'outline';
  size?: 'small' | 'medium' | 'big';
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  color?: AtlusColor;
}

const baseButton = 'inline-flex justify-center items-center font-geologica';

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

// Outline
const outlineWhiteVariant =
  'border-soft-black hover:bg-[var(--atlus-button-outline-hover)] active:bg-[var(--atlus-button-outline-active)] disabled:bg-middle-grey';

const outlineOrangeVariant =
  'border-orange text-orange hover:bg-[#F15F4C] active:bg-[#DC422D] disabled:bg-middle-grey';
const getOutlineVariant = (props: AtlusButtonProps): string => {
  return clsx(
    baseButton,
    'bg-white font-bold',
    'border rounded-[32px]',
    props.color === 'orange' ? outlineOrangeVariant : outlineWhiteVariant
  );
};

// small/mobile
const smallSizeClasses = 'min-w-[100px] py-[10px] px-6 text-13 leading-[16px]';

// medium size
const mediumSizeClasses = 'min-w-[180px] py-[13px] px-9 text-[15px] leading-[17px]';

// big md screen or bigger
const bigSizeClasses = 'min-w-[200px] py-[15px] px-9 text-lg leading-[23px]';

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

export const AtlusButton = (props: AtlusButtonProps) => {
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
    : getOutlineVariant(props);

  return (
    <button
      type={type}
      className={clsx(classVariant, className, getButtonSize(props), isClearVariant && color)}
      disabled={isLoading || disabled}
      {...restProps}
    >
      {isLoading ? <AtlusLoadingSpinner hexColor={getLoadingSpinnerColor(props)} /> : children}
    </button>
  );
};
