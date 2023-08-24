import { FileIcon } from '@/components/common/file-icon';
import { getFileExtension } from '@/utils/file';
import { AtlusTooltip } from '@/components/ui/tooltip/atlus-tooltip';
import { useRef } from 'react';
import { generateID } from '@/utils/id';
import { filesize } from 'filesize';

interface FileNameProps {
  fileName: string;
  fileSize: number;
}

export const FileName = ({ fileName,fileSize }: FileNameProps) => {
  const fileExtension = getFileExtension(fileName);
  const refTooltipId = useRef(generateID());
  return (
    <div className='flex items-center gap-4'>
      <AtlusTooltip tooltipId={refTooltipId.current} />
      <FileIcon extension={fileExtension} />
      <div className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
        <div
          data-tooltip-id={refTooltipId.current}
          data-tooltip-content={fileName}
          className='font-medium text-sm text-soft-black leading-[17px] mb-1 overflow-hidden whitespace-nowrap truncate'>
          {fileName}
        </div>
        <div className='text-xs text-dark-grey leading-[15px]'>
          <span className='uppercase'>{fileExtension}</span>{' '}{filesize(fileSize)}
        </div>
      </div>
    </div>
  );
};
