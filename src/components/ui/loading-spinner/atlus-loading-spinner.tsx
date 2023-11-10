'use client';

import colors from '@/components/ui/theme/colors';
import { Oval } from 'react-loader-spinner';
import clsx from 'clsx';

export type AtlusSpinnerColor = 'orange' | 'white' | 'black' | 'dark-grey';

interface AtlusLoadingSpinnerProps {
  size?: number | string;
  hexColor?: string; // Must start with # // TODO: delete
  classNames?: string;
  color?: AtlusSpinnerColor;
}

const spinnerColors: Record<
  AtlusSpinnerColor,
  {
    primaryColor: string;
    secondaryColor: string;
  }
> = {
  orange: { primaryColor: colors.orange, secondaryColor: 'rgba(239,80,58,0.5)' },
  white: { primaryColor: colors.white, secondaryColor: 'rgba(255,255,255,0.5)' },
  black: { primaryColor: colors.black, secondaryColor: 'rgba(0,0,0,0.5)' },
  'dark-grey': { primaryColor: colors['dark-grey'], secondaryColor: 'rgba(164,162,160,0.5)' },
};

export const AtlusLoadingSpinner = ({
  size = 22,
  classNames,
  color = 'orange',
}: AtlusLoadingSpinnerProps) => {
  const spinnerColor = spinnerColors[color];

  return (
    <Oval
      height={size}
      width={size}
      color={spinnerColor.primaryColor}
      wrapperClass={clsx(classNames, 'flex items-center leading-none')}
      visible={true}
      ariaLabel="loading"
      secondaryColor={spinnerColor.secondaryColor}
      strokeWidth={3.33}
      strokeWidthSecondary={3.33}
    />
  );
};
