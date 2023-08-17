import { FileIcon } from '@/components/common/file-icon';
import { getFileExtension } from '@/utils/file';

interface FileNameProps {
  fileName: string;
}

export const FileName = ({ fileName }: FileNameProps) => {
  const fileExtension = getFileExtension(fileName);
  return (
    <div className='flex items-center gap-4'>
      <FileIcon extension={fileExtension} />
      <div>
        <div className='font-medium text-sm text-soft-black leading-normal mb-1 overflow-hidden whitespace-nowrap truncate'>
          {fileName}
        </div>
        <div className='text-xs text-dark-grey leading-normal'>
          <span className='uppercase'>{fileExtension}</span>{' '}{'377kb'}
        </div>
      </div>
    </div>
  );
};
