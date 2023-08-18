import { UploadingFileState } from '@/redux/features/set-package/slices/documents';
import { FileName } from '@/app/set-package/(pages)/documents/components/documents-list/file-name';
import { HiOutlineX } from 'react-icons/hi';
import clsx from 'clsx';
import { AtlusProgressBar } from '@/components/ui/progress-bar/atlus-progress-bar';
import { AtlusButton } from '@/components/ui/button/atlus-button';

interface UploadingDocumentStatusProps {
  uploadingFileState: UploadingFileState;
  onCancelUpload?: () => void;
  classNames?: string;
}

export const UploadingDocumentStatus = ({
                                          uploadingFileState,
                                          onCancelUpload,
                                          classNames
                                        }: UploadingDocumentStatusProps) => {
  return (
    <div className={clsx(
      'flex items-center justify-between py-6 px-5 gap-6',
      'border border-light-grey rounded-2xl',
      classNames
    )}>
      <FileName fileName={uploadingFileState.serializedFile.name} />
      <div className='flex items-center w-full gap-6'>
        <AtlusProgressBar progress={uploadingFileState.progress} />
        <AtlusButton onClick={onCancelUpload} variant='clear'>
          <HiOutlineX size={20} className='text-middle-grey' />
        </AtlusButton>
      </div>
    </div>
  );
};
