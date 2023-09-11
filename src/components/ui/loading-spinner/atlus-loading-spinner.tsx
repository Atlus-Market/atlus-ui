import 'src/components/ui/loading-spinner/atlus-loading-spinner.css';
import { useEffect, useRef } from 'react';
import hexToRgba from 'hex-to-rgba';
import clsx from 'clsx';

interface AtlusLoadingSpinnerProps {
  size?: number;
  hexColor?: string; // Must start with #
  classNames?: string;
}

export const AtlusLoadingSpinner = ({
  size = 22,
  hexColor,
  classNames,
}: AtlusLoadingSpinnerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const color = hexColor || '#FFFFFF';
    const spinnerColor05 = hexToRgba(color, 0.5);
    const spinnerTopColor1 = hexToRgba(color, 1);
    ref.current.style.setProperty('--atlus-spinner-size', `${size}px`);
    ref.current.style.setProperty('--atlus-spinner-border-color', spinnerColor05);
    ref.current.style.setProperty('--atlus-spinner-border-top-color', spinnerTopColor1);
  }, [size, hexColor]);

  return <div className={clsx('spinner', classNames)} ref={ref} />;
};
