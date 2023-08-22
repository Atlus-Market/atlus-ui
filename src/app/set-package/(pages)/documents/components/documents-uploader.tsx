'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectDocumentsToUpload,
  selectUploadingFiles,
  selectUploadingFilesRequestIds
} from '@/redux/features/set-package/selectors/documents.selectors';
import { useEffect } from 'react';
import { useConst } from '@/hooks/use-const';
import { uploadPackageDocument } from '@/redux/features/set-package/thunks/documents.thunks';
import {
  UploadingDocumentStatus
} from '@/app/set-package/(pages)/documents/components/uploading-document/uploading-document-status';


type Abort = (reason?: string) => void;

interface UploadingFilesExtraOption {
  [requestId: string]: { abort: Abort };
}

export const DocumentsUploader = () => {
  const dispatch = useAppDispatch();
  const uploadingFilesState = useAppSelector(selectUploadingFiles);
  const filesToUpload = useAppSelector(selectDocumentsToUpload);
  const uploadingFilesRequestIds = useAppSelector(selectUploadingFilesRequestIds);
  const uploadingFilesExtraOptions = useConst<UploadingFilesExtraOption>({});

  console.group('Documents Uploader');
  console.log('uploadingFiles: ', uploadingFilesState);
  console.log('uploadingFilesExtraOptions: ', uploadingFilesExtraOptions);
  console.log('filesToUpload: ', filesToUpload);
  console.log('uploadingFilesRequestIds: ', uploadingFilesRequestIds);
  console.groupEnd();

  // useEffect(() => {
  //   filesToUpload.forEach((serializedFileUpload) => {
  //     const thunkValue = dispatch(uploadPackageDocument(serializedFileUpload));
  //     uploadingFilesExtraOptions[thunkValue.requestId] = { abort: thunkValue.abort };
  //   });
  // }, [dispatch, filesToUpload, uploadingFilesExtraOptions]);

  // Clean up requestsIds that are no longer running
  useEffect(() => {
    if (uploadingFilesRequestIds.length === 0) {
      return;
    }
    Object.keys(uploadingFilesExtraOptions).forEach(requestId => {
      if (!uploadingFilesRequestIds.includes(requestId)) {
        delete uploadingFilesExtraOptions[requestId];
      }
    });
  }, [uploadingFilesExtraOptions, uploadingFilesRequestIds]);

  // Cancel all uploads on unmount
  useEffect(() => {
    return () => {
      Object.values(uploadingFilesExtraOptions).forEach(extraOptions => extraOptions.abort());
    };
  }, [uploadingFilesExtraOptions]);

  const isUploadingFiles = uploadingFilesRequestIds.length > 0;

  if (!isUploadingFiles) {
    return null;
  }

  return (
    <div className='mt-3'>
      {uploadingFilesState.map(uploadingFileState => (
        <UploadingDocumentStatus
          key={uploadingFileState.requestId}
          uploadingFileState={uploadingFileState}
          onCancelUpload={() => {
            uploadingFilesExtraOptions[uploadingFileState.requestId].abort();
          }}
          classNames='[&:not(:last-child)]:mb-2'
        />
      ))}
    </div>
  );
};
