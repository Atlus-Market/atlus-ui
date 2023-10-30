import clsx from 'clsx';
import { ReactNode } from 'react';
import Header from '@/components/common/header/header';

const boxShadow = 'shadow-[0_0_120px_0_rgba(0,0,0,0.10)]';

const background = 'bg-[linear-gradient(176deg,_rgba(255,255,255,0.00)_40.2%,_#fff_68.69%)]';

interface LimitedAccessFooterProps {
  children: ReactNode;
}

export const LimitedAccessFooter = ({ children }: LimitedAccessFooterProps) => {
  return (
    <div className={clsx('absolute bottom-0 left-0 w-screen h-screen')}>
      <div className="flex flex-col h-full">
        <Header />
        <div className="w-full h-full">
          <div className="flex flex-col h-full">
            <div className={clsx('w-full h-full', background)} />
            <div
              className={clsx(
                'pt-10 md:pt-[75px] pb-10 md:pb-[65px] px-5',
                'w-full bg-white text-center',
                boxShadow
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
