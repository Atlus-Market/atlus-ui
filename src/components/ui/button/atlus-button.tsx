import { ButtonHTMLAttributes, ReactNode } from 'react';
import './variants/atlus-button-sizes.css';
import './variants/atlus-button-variants.css';
import clsx from 'clsx';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { getSpinnerColor } from '@/components/ui/button/variants/atlus-button-spinner';
import { NOT_FOUND } from '@/constants/general';

export type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type AtlusButtonVariant = 'solid' | 'outline' | 'clear';
// export type AtlusButtonSize = `atlus-btn-${'36' | '38' | '40' | '45' | '53'}`;

export type AtlusButtonColor = 'orange' | 'black' | 'dark-grey';

export interface AtlusButtonProps extends HtmlButtonProps {
  variant?: AtlusButtonVariant;
  color?: AtlusButtonColor;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

export const AtlusButton = (props: AtlusButtonProps) => {
  const {
    variant = 'solid',
    color = 'orange',
    isLoading = false,
    disabled = false,
    className,
    children,
    ...restProps
  } = props;

  const isLoadingState = !disabled && isLoading;
  const containsSizes = className && className.indexOf('atlus-btn-') !== NOT_FOUND;

  return (
    <button
      className={clsx(
        className,
        'font-geologica',
        'inline-flex items-center justify-center gap-[10px]',
        'atlus-button',
        `atlus-button-variant-${variant}`,
        `atlus-button-variant-${variant}-${color}`,
        !containsSizes ? 'atlus-btn-45 md:atlus-btn-53' : undefined
      )}
      disabled={disabled}
      data-loading={isLoadingState}
      {...restProps}
    >
      {isLoadingState ? (
        <div className="flex justify-center items-center">
          <AtlusLoadingSpinner size="1.2em" color={getSpinnerColor({ variant, color })} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
