import { ChangeEvent, forwardRef, useRef } from 'react';
import { DataImageURL } from '@/types';

interface FileSelectorProps {
  className?: string;
  onFileSelected: (image: DataImageURL) => void;
}

export const FileSelector = forwardRef<HTMLInputElement, FileSelectorProps>(
  function FileSelectorWithRef({ onFileSelected, className }, externalRef) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    if (externalRef && 'current' in externalRef) {
      externalRef.current = inputRef.current;
    }

    const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
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
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className={className}
        onChange={onSelectFile}
      />
    );
  }
);
