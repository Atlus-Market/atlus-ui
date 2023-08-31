'use client';

import { AtlusSelectFile } from '@/components/ui/select-file/atlus-select-file';
import { Accept } from 'react-dropzone';
import { useAppDispatch } from '@/redux/hooks';
import { setImportPatentsFile } from '@/redux/features/set-package/set-package';
import { createSerializedFile } from '@/utils/file';

const acceptedFileTypes: Accept = {
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
  'text/csv': [],
  'application/vnd.ms-excel': []
};

export const SelectPatentsFile = () => {
  const dispatch = useAppDispatch();
  return (
    <AtlusSelectFile
      maxFiles={1}
      acceptedFileTypes={acceptedFileTypes}
      onFilesSelected={(files)=>{
        files.forEach(file => dispatch(setImportPatentsFile({file:createSerializedFile(file)})))
      }}
    />
  );
};
