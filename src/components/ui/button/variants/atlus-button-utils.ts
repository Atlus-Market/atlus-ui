import { AtlusSpinnerColor } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { AtlusButtonColor, AtlusButtonVariant } from '@/components/ui/button/atlus-button';

export const getSpinnerColor = ({
  variant,
  color,
}: {
  variant: AtlusButtonVariant;
  color: AtlusButtonColor;
}): AtlusSpinnerColor => {
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

  if (variant === 'icon-only') {
    return 'orange';
  }

  console.warn(`Unable to get spinner color for variant ${variant} and color ${color}`);
  return 'orange';
};
