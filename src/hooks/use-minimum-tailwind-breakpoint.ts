import { useMediaQuery } from 'react-responsive';
import screens from '@/components/ui/theme/screens';

const breakpoints = screens;

export type BreakpointKey = keyof typeof breakpoints;

export function useMinimumTailwindBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  return useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
}
