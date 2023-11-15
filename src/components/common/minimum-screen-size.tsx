'use client';

import { BreakpointKey } from '@/hooks/use-minimum-tailwind-breakpoint';
import { ReactNode } from 'react';
import { useBetweenTailwindBreakpoints } from '@/hooks/use-between-tailwind-breakpoints';

export interface MinimumScreenSizeProps {
  minBreakpointKey: BreakpointKey;
  maxBreakpointKey?: BreakpointKey;
  children: ReactNode;
  noContentChildren?: ReactNode;
}

export const MinimumScreenSize = ({
  minBreakpointKey,
  maxBreakpointKey,
  children,
  noContentChildren = null,
}: MinimumScreenSizeProps) => {
  const isBreakpointActive = useBetweenTailwindBreakpoints({
    minBreakpoint: minBreakpointKey,
    maxBreakpoint: maxBreakpointKey,
  });

  if (!isBreakpointActive) {
    return <>{noContentChildren}</>;
  }

  return <>{children}</>;
};
