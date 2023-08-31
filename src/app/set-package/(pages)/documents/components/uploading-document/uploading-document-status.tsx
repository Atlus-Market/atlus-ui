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
                                          onCancelUpload,
                                          classNames,
                                          fileSize,
                                          fileName,
                                          progress
                                        }: UploadingDocumentStatusProps) => {
  const isPendingUpload = progress === PENDING_UPLOAD;
  return (
    <FileContainer
      classNames={classNames}
      file={
        <FileName
          fileName={fileName}
          fileSize={fileSize}
        />
      }
      onCancelUpload={onCancelUpload}>
      {isPendingUpload ?
        <div className='w-full text-middle-grey text-sm'>Pending...</div> :
        <AtlusProgressBar progress={progress} />
      }
    </FileContainer>
  );
};
