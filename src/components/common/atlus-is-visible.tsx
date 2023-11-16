'use client';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface AtlusIsVisibleMoreProps {
  children: ReactNode;
  onVisibilityChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
  enabled?: boolean;
}

export const AtlusIsVisible = ({
  children,
  enabled,
  onVisibilityChange,
}: AtlusIsVisibleMoreProps) => {
  const { ref, inView } = useInView({
    threshold: 0,
    onChange: onVisibilityChange,
    skip: enabled,
  });

  return <div ref={ref}>{enabled && inView && children}</div>;
};
