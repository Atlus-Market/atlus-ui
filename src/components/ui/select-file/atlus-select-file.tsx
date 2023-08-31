'use client';

import Image from 'next/image';
import UploadFileImageSvg from '@/public/assets/images/upload-file.svg';
import { useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import clsx from 'clsx';

const NO_MAX_FILES_LIMIT = 0;

interface AtlusSelectFileProps {
  onFilesSelected?: (selectedFiles: File[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: Accept;
}

export const AtlusSelectFile = ({ onFilesSelected, maxFiles = NO_MAX_FILES_LIMIT, acceptedFileTypes }: AtlusSelectFileProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('acceptedFiles: ', acceptedFiles);
    onFilesSelected?.(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles, accept: acceptedFileTypes });

  return (
    <div
      className={clsx(
        'rounded-2xl border border-dashed py-12',
        isDragActive ? 'bg-[#FFFBF9] border-peach' : 'bg-white border-light-grey',
        'hover:cursor-pointer'
      )}
      {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='flex justify-center flex-col items-center'>
        <Image src={UploadFileImageSvg} alt='upload-file' className='mb-6' />
        <div className='mb-2 leading-none'>
          <span className='text-sm text-soft-black font-medium leading-5'>
            Select files to upload
          </span>
        </div>
        <div className='leading-none'>
          <span className='text-dark-grey text-xs font-normal leading-[15px]]'>Or drag and drop them here</span>
        </div>
      </div>
    </div>
  );
};
