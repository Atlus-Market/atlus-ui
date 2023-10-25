import { AtlusSpinnerColor } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { AtlusButtonProps } from '@/components/ui/button/atlus-button';

export const getSpinnerColor = ({ variant, color }: AtlusButtonProps): AtlusSpinnerColor => {
  if (variant === 'solid' && color === 'orange') {
    return 'white';
  }

  if (variant === 'outline') {
    if (color === 'black') {
      return 'black';
    }
    if (color === 'orange') {
      return 'orange';
    }
  }

  if (variant === 'clear') {
    return 'dark-grey';
  }

  console.warn(`Unable to get spinner color for variant ${variant} and color ${color}`);
  return 'orange';
};
