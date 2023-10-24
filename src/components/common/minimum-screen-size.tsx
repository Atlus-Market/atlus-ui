'use client';

import {
  BreakpointKey,
  useMinimumTailwindBreakpoint,
} from '@/hooks/use-minimum-tailwind-breakpoint';
import { ReactNode } from 'react';

export interface MinimumScreenSizeProps {
  breakpointKey: BreakpointKey;
  children: ReactNode;
  noContentChildren: ReactNode;
}

export const MinimumScreenSize = ({
  breakpointKey,
  children,
  noContentChildren,
}: MinimumScreenSizeProps) => {
  const isMinimumBreakpoint = useMinimumTailwindBreakpoint(breakpointKey);

  if (!isMinimumBreakpoint) {
    return <>{noContentChildren}</>;
  }

  return <>{children}</>;
};
