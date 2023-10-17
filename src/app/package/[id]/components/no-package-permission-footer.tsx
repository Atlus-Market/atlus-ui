import clsx from 'clsx';

const boxShadow = 'shadow-[0_0_120px_0_rgba(0,0,0,0.10)]';

const background = 'bg-[linear-gradient(176deg,_rgba(255,255,255,0.00)_40.2%,_#fff_68.69%)]';
export const NoPackagePermissionFooter = () => {
  return (
    <div className={clsx('absolute top-0 left-0  w-screen h-screen')}>
      <div className="flex flex-col h-full">
        <div className={clsx('w-full h-full', background)} />

        <div className={clsx('h-[30%] w-full bg-white', boxShadow)}>
          <div>You need permission to view this package</div>
        </div>
      </div>
    </div>
  );
};
