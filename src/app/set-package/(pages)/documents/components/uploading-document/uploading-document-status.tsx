import { FileName } from '@/app/set-package/(pages)/documents/components/documents-list/file-name';
import { HiOutlineX } from 'react-icons/hi';
import clsx from 'clsx';
import { AtlusProgressBar } from '@/components/ui/progress-bar/atlus-progress-bar';
import { AtlusButton } from '@/components/ui/button/atlus-button';

export const PENDING_UPLOAD = -1;

interface UploadingDocumentStatusProps {
  onCancelUpload?: () => void;
  classNames?: string;

  fileName: string;
  fileSize: number;
  progress: number;
}

export const UploadingDocumentStatus = ({
                                          onCancelUpload,
                                          classNames,
                                          fileSize,
                                          fileName,
                                          progress
                                        }: UploadingDocumentStatusProps) => {
  const isPendingUpload = progress === PENDING_UPLOAD;
  return (
    <div className={clsx(
      'flex items-center justify-between py-6 px-5 gap-6',
      'border border-light-grey rounded-2xl',
      classNames
    )}>
      <div className='w-[50%] flex-shrink-0'>
        <FileName fileName={fileName}
                  fileSize={fileSize} />
      </div>
      <div className='flex items-center w-full gap-6'>
        {isPendingUpload ? <div className='w-full text-middle-grey text-sm'>Pending...</div> :
          <AtlusProgressBar progress={progress} />}
        <AtlusButton onClick={onCancelUpload} variant='clear'>
          <HiOutlineX size={20} className='text-middle-grey' />
        </AtlusButton>
      </div>
    </div>
  );
};
