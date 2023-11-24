import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode, RefObject } from 'react';
import './variants/atlus-button-sizes.css';
import './variants/atlus-button-variants.css';
import clsx from 'clsx';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { getSpinnerColor } from '@/components/ui/button/variants/atlus-button-utils';
import { NOT_FOUND } from '@/constants/general';

export type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type AtlusButtonVariant = 'solid' | 'outline' | 'clear' | 'icon-only';
// export type AtlusButtonSize = `atlus-btn-${'36' | '38' | '40' | '45' | '53'}`;

export type AtlusButtonColor = 'orange' | 'grey' | 'black' | 'dark-grey';

export interface AtlusButtonProps extends HtmlButtonProps {
  variant?: AtlusButtonVariant;
  color?: AtlusButtonColor;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnlyIcon?: ReactNode;

  innerRef?: RefObject<HTMLButtonElement> | ForwardedRef<HTMLButtonElement>;
}

const AtlusButtonBase = (props: AtlusButtonProps) => {
  const {
    variant = 'solid',
    color = 'orange',
    isLoading = false,
    disabled = false,
    className,
    children,
    iconOnlyIcon,
    leftIcon,
    rightIcon,
    innerRef,
    type,
    ...restProps
  } = props;

  const isIconOnlyVariant = variant === 'icon-only';
  const isLoadingState = !disabled && isLoading;
  const containsSizes = className && className.indexOf('atlus-btn-') !== NOT_FOUND;

  return (
    <button
      ref={innerRef}
      className={clsx(
        className,
        'font-geologica',
        'inline-flex items-center justify-center gap-[10px]',
        'atlus-button',
        `atlus-button-variant-${variant}`,
        `atlus-button-variant-${variant}-${color}`,
        {
          'atlus-btn-icon-only': isIconOnlyVariant,
          'atlus-btn-45 md:atlus-btn-53': !isIconOnlyVariant && !containsSizes, // Default
        }
      )}
      disabled={disabled}
      data-loading={isLoadingState}
      data-icon-only={isIconOnlyVariant}
      type={type || 'button'}
      {...restProps}
    >
      {isLoadingState ? (
        <div className="flex justify-center items-center">
          <AtlusLoadingSpinner
            size={isIconOnlyVariant ? '1em' : '1.2em'}
            color={getSpinnerColor({ variant, color })}
          />
        </div>
      ) : (
        <>
          {isIconOnlyVariant ? (
            <span>{iconOnlyIcon}</span>
          ) : (
            <>
              {leftIcon && <span className="atlus-btn-icon-size">{leftIcon}</span>}
              {children}
              {rightIcon && <span className="atlus-btn-icon-size">{rightIcon}</span>}
            </>
          )}
        </>
      )}
    </button>
  );
};

export const AtlusButton = forwardRef<HTMLButtonElement, AtlusButtonProps>(
  function AtlusButtonWithRef(props, ref) {
    return <AtlusButtonBase innerRef={ref} {...props} />;
  }
);
