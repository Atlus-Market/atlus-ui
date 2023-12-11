import { ReactNode } from 'react';

interface PackagesListWrapperProps {
  children: ReactNode;
}

export const PackagesListWrapper = ({ children }: PackagesListWrapperProps) => {
  return <div className="flex flex-col items-center w-full gap-4 md:gap-6">{children}</div>;
};
