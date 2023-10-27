import { getFileExtension } from '@/utils/file';
import { AtlusTooltip } from '@/components/ui/tooltip/atlus-tooltip';
import { generateID } from '@/utils/id';
import { filesize } from 'filesize';
import { FileIcon } from '@/components/common/file/file-icon';
import { HiCheck } from 'react-icons/hi2';

interface FileNameProps {
  fileName: string;
  fileSize: number;
  isPrivateFile?: boolean;

  /**
   * Use it when the component is not in a list.
   * Tooltip doesn't work well when rendered many times, so reuse the tooltip
   * instance once.
   * See AtlusTooltip for more info.
   */
  showTooltip?: boolean;
  tooltipId?: string;

  showPrivacyLabel?: boolean;
}

export const FileName = ({
  fileName,
  fileSize,
  showTooltip = true,
  tooltipId = generateID(),
  isPrivateFile,
  showPrivacyLabel = false,
}: FileNameProps) => {
  const fileExtension = getFileExtension(fileName);
  return (
    <div className="flex items-center gap-4 overflow-hidden">
      {showTooltip && <AtlusTooltip tooltipId={tooltipId} />}
      <FileIcon extension={fileExtension} />
      <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        <div
          data-tooltip-id={tooltipId}
          data-tooltip-content={fileName}
          className="font-medium text-sm text-soft-black leading-17 mb-1 overflow-hidden whitespace-nowrap truncate"
        >
          {fileName}
        </div>
        <div className="text-xs text-dark-grey leading-[15px] flex items-center">
          <span>
            <span className="uppercase">{fileExtension}</span> {filesize(fileSize)}
          </span>
          {showPrivacyLabel && isPrivateFile && (
            <span className="text-green text-xs inline-flex items-center ml-[18px]">
              <HiCheck size={13} className="text-green mr-1" /> Private access
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
