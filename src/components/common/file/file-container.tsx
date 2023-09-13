import clsx from 'clsx';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiOutlineX } from 'react-icons/hi';
import { ReactNode } from 'react';

interface FileContainerProps {
  classNames?: string;
  file: ReactNode;
  children?: ReactNode;
  showDeleteButton?: boolean;
  onCancelUpload?: () => void;
}

export const FileContainer = ({
  classNames,
  file,
  children,
  showDeleteButton = true,
  onCancelUpload,
}: FileContainerProps) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between py-6 px-5 gap-6',
        'border border-light-grey rounded-2xl',
        classNames
      )}
    >
      <div className="w-[70%] flex-shrink-0">{file}</div>
      <div className="flex items-center w-full gap-6 justify-end">
        {children}
        {showDeleteButton && (
          <AtlusButton onClick={onCancelUpload} variant="clear">
            <HiOutlineX size={20} className="text-middle-grey" />
          </AtlusButton>
        )}
      </div>
    </div>
  );
};
