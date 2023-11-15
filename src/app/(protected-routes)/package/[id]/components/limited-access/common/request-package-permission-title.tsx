import clsx from 'clsx';

interface RequestPackagePermissionTitleProps {
  text: string;
  className?: string;
}

export const RequestPackagePermissionTitle = ({
  text,
  className,
}: RequestPackagePermissionTitleProps) => {
  return (
    <div className={clsx('text-lg font-geologica md:text-2xl mb-4 md:mb-6', className)}>{text}</div>
  );
};
