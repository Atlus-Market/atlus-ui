import { ChangeEvent, forwardRef, useEffect, useRef } from 'react';
import { DataImageURL } from '@/types';
import { AtlusDialogModal } from '@/components/ui/modal/dialog/atlus-dialog-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { filesize } from 'filesize';

interface FileSelectorProps {
  className?: string;
  onFileSelected: (image: DataImageURL) => void;
  maxFileSizeBytes?: number;
}

export const FileSelector = forwardRef<HTMLInputElement, FileSelectorProps>(
  function FileSelectorWithRef({ onFileSelected, className, maxFileSizeBytes = 0 }, externalRef) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { isOn, setOn, setOff } = useToggleState();

    if (externalRef && 'current' in externalRef) {
      externalRef.current = inputRef.current;
    }

    useEffect(() => {
      if (externalRef && 'current' in externalRef) {
        externalRef.current = inputRef.current;
      }
    }, [inputRef.current, externalRef]);

    const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        if (maxFileSizeBytes > 0 && file.size > maxFileSizeBytes) {
          setOn();
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener(
          'load',
          () => {
            onFileSelected(reader.result as string);
            if (inputRef.current) {
              // Clear the input so same image can be reselected
              inputRef.current.value = '';
            }
          },
          { once: true }
        );
      }
    };

    return (
      <>
        <AtlusDialogModal
          isOpen={isOn}
          title="Attention"
          text={`The file size must not exceed ${filesize(maxFileSizeBytes)}.`}
          mainButton={{
            text: 'Close',
            onClick: setOff,
          }}
        />
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          className={className}
          onChange={onSelectFile}
        />
      </>
    );
  }
);
