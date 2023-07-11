import 'src/components/ui/loading-spinner/atlus-loading-spinner.css';
import { useEffect, useRef } from 'react';

interface AtlusLoadingSpinnerProps {
  size?: number;
}

export const AtlusLoadingSpinner = ({
  size = 22,
}: AtlusLoadingSpinnerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.setProperty('--atlus-spinner-size', `${size}px`);
  }, [size]);

  return <div className="spinner" ref={ref} />;
};
