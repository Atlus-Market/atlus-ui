import { ButtonHTMLAttributes, ReactNode } from 'react';
import './variants/atlus-button-sizes.css';
import './variants/atlus-button-variants.css';
import clsx from 'clsx';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { getSpinnerColor } from '@/components/ui/button/variants/atlus-button-spinner';

export type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type AtlusButtonVariant = 'solid' | 'outline' | 'clear';
export type AtlusButtonSize = '36' | '38' | '40' | '45' | '53';
export type AtlusButtonColor = 'orange' | 'black' | 'dark-grey';

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
    variant,
    size = '45',
    color,
    isLoading = false,
    disabled = false,
    className,
    children,
    sizeOld,
    ...restProps
  } = props;

  const isLoadingState = !disabled && isLoading;
  return (
    <button
      className={clsx(
        'font-geologica',
        'atlus-button',
        `atlus-button-size-${size}`,
        `atlus-button-variant-${variant}`,
        `atlus-button-variant-${variant}-${color}`
      )}
      disabled={disabled}
      data-loading={isLoadingState}
      {...restProps}
    >
      {isLoadingState ? (
        <div className="flex justify-center items-center">
          <AtlusLoadingSpinner size="1.2em" color={getSpinnerColor(props)} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
