import { ButtonHTMLAttributes, ReactNode } from 'react';
import './variants/atlus-button-sizes.css';
import './variants/atlus-button-variants.css';
import clsx from 'clsx';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';

export type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type AtlusButtonVariant = 'solid' | 'outline' | 'clear';
export type AtlusButtonSize = '36' | '38' | '40' | '45' | '53';
export type AtlusButtonColor = 'orange' | 'black' | 'grey';

export interface AtlusButtonProps extends HtmlButtonProps {
  variant?: AtlusButtonVariant;
  size?: AtlusButtonSize;
  color?: AtlusButtonColor;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;

  children: ReactNode; // TODO: Make it type string (usage for icon?)

  // TODO: rename and remove
  sizeOld?: 'small' | 'medium' | 'big';
}

export const AtlusButton = (props: AtlusButtonProps) => {
  const {
    variant = 'solid',
    children,
    type = 'button',
    isLoading = false,
    disabled = false,
    color,
    className,
    size = '38',
    ...restProps
  } = props;
  return (
    <button
      type={type}
      className={clsx(
        'font-geologica',
        'atlus-button',
        `atlus-button-size-${size}`,
        `atlus-button-variant-${variant}`,
        `atlus-button-variant-${variant}-${color}`
      )}
      disabled={disabled}
      {...restProps}
    >
      {isLoading ? <AtlusLoadingSpinner size="1em" /> : children}
    </button>
  );
};
