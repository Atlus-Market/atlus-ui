import clsx from 'clsx';
import { geologica, inter } from '@/components/ui/theme/fonts';
import { AtlusButton } from '@/components/ui/button/atlus-button';

const boxShadow = 'shadow-[0_0_120px_0_rgba(0,0,0,0.10)]';

const background = 'bg-[linear-gradient(176deg,_rgba(255,255,255,0.00)_40.2%,_#fff_68.69%)]';
export const NoPackagePermissionFooter = () => {
  return (
    <div className={clsx('absolute bottom-0 left-0  w-screen h-full')}>
      <div className="flex flex-col h-full">
        <div className={clsx('w-full h-full', background)} />

        <div
          className={clsx(
            'pt-10 md:pt-[75px] pb-10 md:pb-[65px] px-5',
            'w-full bg-white text-center',
            boxShadow
          )}
        >
          <div className={clsx('text-lg md:text-2xl mb-4 md:mb-6', geologica)}>
            You need permission to view this package
          </div>
          <div className={clsx('text-sm md:text-base leading-6 mb-6 md:mb-8', inter)}>
            Request access from the package broker.
          </div>

          <AtlusButton variant="outline" color="orange" id="1">
            Request access
          </AtlusButton>
        </div>
      </div>
    </div>
  );
};
