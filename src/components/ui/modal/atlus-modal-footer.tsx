import { ReactNode } from 'react';

interface AtlusModalFooterProps {
  children: ReactNode;
}

export const AtlusModalFooter = ({ children }: AtlusModalFooterProps) => {
  return (
    <div className='flex justify-end'>
      {children}
    </div>
  );
};
