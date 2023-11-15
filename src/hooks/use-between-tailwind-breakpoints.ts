import { useMediaQuery } from 'react-responsive';
import screens from '@/components/ui/theme/screens';

const breakpoints = screens;

export type BreakpointKey = keyof typeof breakpoints;

interface UseBetweenTailwindBreakpointsProps {
  minBreakpoint: BreakpointKey;
  maxBreakpoint?: BreakpointKey;
}

export function useBetweenTailwindBreakpoints({
  minBreakpoint,
  maxBreakpoint,
}: UseBetweenTailwindBreakpointsProps) {
  const maxWidth = maxBreakpoint ? `and (max-width: ${breakpoints[maxBreakpoint]})` : '';
  return useMediaQuery({
    query: `(min-width: ${breakpoints[minBreakpoint]}) ${maxWidth}`,
  });
}
