import { ReactNode } from 'react';

interface SharePackageTabContentProps {
  children: ReactNode;
}

export const SharePackageTabContent = ({ children }: SharePackageTabContentProps) => {
  return <div className="h-[300px] md:h-[400px] overflow-y-auto">{children}</div>;
};
