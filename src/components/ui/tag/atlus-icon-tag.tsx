import clsx from 'clsx';
import { ReactNode } from 'react';

export const atlusIconTagDataId = 'id';

interface AtlusIconTagProps {
  id: string;
  text: string;
  isActive: boolean;
  disabled?: boolean;
  icon: ReactNode;
  className?: string;
}

interface AtlusIconStateColor {
  opacity: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
}

const atlusIconStateColors: Record<string, AtlusIconStateColor> = {
  normal: {
    opacity: '',
    textColor: 'text-dark-grey',
    bgColor: 'bg-white',
    borderColor: 'border-light-grey',
  },
  active: {
    opacity: '',
    textColor: 'text-orange',
    bgColor: 'bg-off-white',
    borderColor: 'border-orange',
  },
  disabled: {
    opacity: 'opacity-50',
    textColor: 'text-dark-grey',
    bgColor: 'bg-white',
    borderColor: 'border-light-grey',
  },
};

export const AtlusIconTag = ({
  id,
  text,
  isActive,
  disabled = false,
  icon,
  className,
}: AtlusIconTagProps) => {
  const data = { [`data-${atlusIconTagDataId}`]: id };

  let colorState = atlusIconStateColors.normal;
  if (disabled) {
    colorState = atlusIconStateColors.disabled;
  } else if (isActive) {
    colorState = atlusIconStateColors.active;
  }

  return (
    <div
      {...data}
      className={clsx(
        'inline-flex items-center flex-shrink-0 border rounded-lg py-[16px] px-[20px]',
        'select-none hover:cursor-pointer',
        colorState.borderColor,
        colorState.bgColor,
        colorState.opacity,
        className
      )}
    >
      <div className={clsx('leading-none text-soft-black flex-shrink-0')}>{icon}</div>
      <span
        className={clsx(
          'font-normal text-sm md:text-base pl-3',
          'text-ellipsis overflow-hidden whitespace-nowrap',
          colorState.textColor
        )}
      >
        {text}
      </span>
    </div>
  );
};
