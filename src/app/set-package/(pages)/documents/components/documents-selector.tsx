'use client';

import { AtlusSelectFile } from '@/components/ui/select-file/atlus-select-file';
import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addFileToUpload } from '@/redux/features/set-package/set-package';
import { generateID } from '@/utils/id';
import { createSerializedFile } from '@/utils/file';

export const DocumentsSelector = () => {
  const dispatch = useAppDispatch();

  const onDocumentsSelected = useCallback((files: File[]) => {
    files.forEach((file) => {
      dispatch(addFileToUpload(createSerializedFile(file)));
    });
  }, [dispatch]);

  return (
    <AtlusSelectFile onFilesSelected={onDocumentsSelected} />
  );
};
