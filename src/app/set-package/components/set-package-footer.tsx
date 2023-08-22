import { ReactNode } from 'react';

interface SetPackageFooterProps {
  children: ReactNode;
}

export const SetPackageFooter = ({ children }: SetPackageFooterProps) => {
  return (
    <div className='flex justify-end mt-[60px]'>
      {children}
    </div>
  );
};
