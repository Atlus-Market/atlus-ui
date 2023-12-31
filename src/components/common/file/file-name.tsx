import { getFileExtension } from '@/utils/file';
import { AtlusTooltip } from '@/components/ui/tooltip/atlus-tooltip';
import { useRef } from 'react';
import { generateID } from '@/utils/id';
import { filesize } from 'filesize';
import { FileIcon } from '@/components/common/file/file-icon';

interface FileNameProps {
  fileName: string;
  fileSize: number;

  /**
   * Use it when the component is not in a list.
   * Tooltip doesn't work well when rendered many times, so reuse the tooltip
   * instance once.
   * See AtlusTooltip for more info.
   */
  showTooltip?: boolean;
  tooltipId?: string;
}

export const FileName = ({ fileName, fileSize, showTooltip = true, tooltipId }: FileNameProps) => {
  const fileExtension = getFileExtension(fileName);
  const refTooltipId = useRef(tooltipId || generateID());
  return (
    <div className="flex items-center gap-4">
      {showTooltip && <AtlusTooltip tooltipId={refTooltipId.current} />}
      <FileIcon extension={fileExtension} />
      <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        <div
          data-tooltip-id={refTooltipId.current}
          data-tooltip-content={fileName}
          className="font-medium text-sm text-soft-black leading-[17px] mb-1 overflow-hidden whitespace-nowrap truncate"
        >
          {fileName}
        </div>
        <div className="text-xs text-dark-grey leading-[15px]">
          <span className="uppercase">{fileExtension}</span> {filesize(fileSize)}
        </div>
      </div>
    </div>
  );
};
