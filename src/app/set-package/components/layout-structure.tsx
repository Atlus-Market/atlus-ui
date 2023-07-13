import { ReactNode } from 'react';
import { PageWrapper } from '@/components/common/page-wrapper';

interface LayoutStructureProps {
  sideBarChildren: ReactNode;
  children: ReactNode;
}

export const LayoutStructure = ({ sideBarChildren, children }: LayoutStructureProps) => {
  return (
    <div className='grid grid-cols-[240px,1fr] h-full'>
      <div>
        {sideBarChildren}
      </div>
      <PageWrapper>
        {children}
      </PageWrapper>
    </div>
  );
};
