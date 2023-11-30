import { FileSelector } from '@/components/ui/select-file/file-selector';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useCallback, useRef } from 'react';
import { DataImageURL } from '@/types';

interface ButtonLogoSelectorProps {
  btnText: string;
  onSelectFile: (dataImageURL: DataImageURL) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const ButtonLogoSelector = ({ btnText, onSelectFile }: ButtonLogoSelectorProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectFile = useCallback(() => {
    inputRef.current?.click();
  }, []);
  return (
    <>
      <FileSelector
        className="hidden"
        onFileSelected={onSelectFile}
        ref={inputRef}
        maxFileSizeBytes={MAX_FILE_SIZE}
      />
      <AtlusButton
        variant="outline"
        color="black"
        className="atlus-btn-36 sm:max-md:!min-w-0 sm:max-md:w-[95px]"
        onClick={selectFile}
      >
        {btnText}
      </AtlusButton>
    </>
  );
};
