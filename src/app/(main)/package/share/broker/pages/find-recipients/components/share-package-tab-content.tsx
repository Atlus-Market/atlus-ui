import { ReactNode } from 'react';

interface SharePackageTabContentProps {
  children: ReactNode;
}

export const SharePackageTabContent = ({ children }: SharePackageTabContentProps) => {
  return <div className="max-h-[35dvh] md:h-[400px] overflow-y-auto">{children}</div>;
};
