'use client';

import { ReactNode, useLayoutEffect } from 'react';

interface MainLayoutColorProps {
  children: ReactNode;
  color?: string;
}

const setLayoutBackgroundColor = (color: string) => {
  document.body.style.setProperty('--atlus-layout-bg-color', color);
};

export const MainLayoutColor = ({ children, color }: MainLayoutColorProps) => {
  useLayoutEffect(() => {
    if (color) {
      setLayoutBackgroundColor(color);
    }
    return () => {
      setLayoutBackgroundColor('var(--atlus-layout-default-color)');
    };
  }, [color]);

  return <>{children}</>;
};
