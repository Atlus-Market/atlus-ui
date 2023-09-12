'use client';

import { ReactNode, useState } from 'react';
import { AtlusExpandButton } from '@/components/ui/button/atlus-expand-button';
import clsx from 'clsx';

interface VariableContainerProps {
  condensedClassnames?: string;
  expandedClassnames?: string;
  children: ReactNode;
  onChange?: (isExpanded: boolean) => void;
}

export const VariableContainer = ({
  condensedClassnames = 'max-h-[144px]',
  expandedClassnames = 'max-h-[100%]',
  children,
  onChange,
}: VariableContainerProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div>
      <div
        className={clsx('overflow-hidden', isExpanded ? expandedClassnames : condensedClassnames)}
      >
        {children}
      </div>
      <AtlusExpandButton
        text="See more"
        isExpanded={isExpanded}
        onClick={() => {
          setIsExpanded(!isExpanded);
          onChange?.(!isExpanded);
        }}
      />
    </div>
  );
};
