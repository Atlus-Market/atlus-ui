import { AtlusProgressBar } from '@/components/ui/progress-bar/atlus-progress-bar';
import { FileName } from '@/components/common/file/file-name';
import { FileContainer } from '@/components/common/file/file-container';

export const PENDING_UPLOAD = -1;

interface UploadingDocumentStatusProps {
  onCancelUpload?: () => void;
  classNames?: string;

  fileName: string;
  fileSize: number;
  progress: number;
}

export const UploadingDocumentStatus = ({
  uploadingFileState,
  onCancelUpload,
  classNames,
}: UploadingDocumentStatusProps) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between py-6 px-5 gap-6',
        'border border-light-grey rounded-2xl',
        classNames
      )}
    >
      <div className="w-[50%]">
        <FileName
          fileName={uploadingFileState.serializedFile.name}
          fileSize={uploadingFileState.serializedFile.size}
        />
      </div>
      <div className="flex items-center w-full gap-6">
        <AtlusProgressBar progress={uploadingFileState.progress} />
        <AtlusButton onClick={onCancelUpload} variant="clear">
          <HiOutlineX size={20} className="text-middle-grey" />
        </AtlusButton>
      </div>
    </div>
  );
};
