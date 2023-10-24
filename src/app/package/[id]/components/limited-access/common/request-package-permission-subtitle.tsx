import clsx from 'clsx';
import { ReactNode } from 'react';

interface RequestPackagePermissionSubtitleProps {
  content: ReactNode;
  className?: string;
}

export const RequestPackagePermissionSubtitle = ({
  content,
  className,
}: RequestPackagePermissionSubtitleProps) => {
  return (
    <div
      className={clsx(
        'text-sm md:text-base font-inter leading-6 mb-6 md:mb-8',
        'flex justify-center items-center gap-2 md:gap-3',
        className
      )}
    >
      {content}
    </div>
  );
};
