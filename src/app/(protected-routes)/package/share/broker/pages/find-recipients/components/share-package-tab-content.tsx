import { ReactNode } from 'react';

interface SharePackageTabContentProps {
  children: ReactNode;
}

export const SharePackageTabContent = ({ children }: SharePackageTabContentProps) => {
  return <div className="h-[400px] overflow-y-auto">{children}</div>;
};
