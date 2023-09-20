import { ReactNode } from 'react';

interface SelectDocumentsProviderProps {
  children: ReactNode;
}

export const SelectDocumentsProvider = ({ children }: SelectDocumentsProviderProps) => {
  return <>{children}</>;
};
