import { ReactNode } from 'react';

interface AtlusModalBodyProps {
  children: ReactNode;
  className?: string;
}

export const AtlusModalBody = ({ children, className }: AtlusModalBodyProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};
