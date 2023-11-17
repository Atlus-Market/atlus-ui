'use client';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface AtlusIsVisibleMoreProps {
  children: ReactNode;
  onVisibilityChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
  enabled?: boolean;
  threshold?: number;
}

export const AtlusIsVisible = ({
  children,
  enabled,
  onVisibilityChange,
  threshold = 0,
}: AtlusIsVisibleMoreProps) => {
  const { ref, inView, entry } = useInView({
    threshold,
    onChange: onVisibilityChange,
    skip: !enabled,
  });

  return <div ref={ref}>{enabled && inView && children}</div>;
};
