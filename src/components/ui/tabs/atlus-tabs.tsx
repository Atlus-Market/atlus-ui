import { ReactNode } from 'react';

interface AtlusTabsProps {
  children: ReactNode;
}

export const AtlusTabs = ({ children }: AtlusTabsProps) => {
  return <div className="flex justify-start items-center gap-[45px] mb-[40px]">{children}</div>;
};
