'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectDocumentsToUpload,
  selectUploadFilesQueue,
  selectUploadingFiles,
  selectUploadingFilesRequestIds
} from '@/redux/features/set-package/selectors/documents.selectors';
import { useEffect } from 'react';
import { useConst } from '@/hooks/use-const';
import { uploadPackageDocument } from '@/redux/features/set-package/thunks/upload-documents.thunks';
import {
  PENDING_UPLOAD,
  UploadingDocumentStatus
} from '@/app/set-package/(pages)/documents/components/uploading-document/uploading-document-status';
import { removeQueuedFile } from '@/redux/features/set-package/set-package';


type Abort = (reason?: string) => void;

interface UploadingFilesExtraOption {
  [requestId: string]: { abort: Abort };
}

export const DocumentsUploader = () => {
  const dispatch = useAppDispatch();
  const uploadingFilesState = useAppSelector(selectUploadingFiles);
  const uUploadFilesQueue = useAppSelector(selectUploadFilesQueue);
  const filesToUpload = useAppSelector(selectDocumentsToUpload);
  const uploadingFilesRequestIds = useAppSelector(selectUploadingFilesRequestIds);
  const uploadingFilesExtraOptions = useConst<UploadingFilesExtraOption>({});

  console.group('Documents Uploader');
  console.log('uploadingFiles: ', uploadingFilesState);
  console.log('uUploadFilesQueue: ', uUploadFilesQueue);
  console.log('uploadingFilesExtraOptions: ', uploadingFilesExtraOptions);
  console.log('filesToUpload: ', filesToUpload);
  console.log('uploadingFilesRequestIds: ', uploadingFilesRequestIds);
  console.groupEnd();

  useEffect(() => {
    filesToUpload.forEach((serializedFileUpload) => {
      const thunkValue = dispatch(uploadPackageDocument(serializedFileUpload));
      uploadingFilesExtraOptions[thunkValue.requestId] = { abort: thunkValue.abort };
      debugger;
    });
  }, [dispatch, filesToUpload, uploadingFilesExtraOptions]);

  // Clean up requestsIds that are no longer running
  useEffect(() => {
    if (uploadingFilesRequestIds.length === 0) {
      return;
    }
    Object.keys(uploadingFilesExtraOptions).forEach(requestId => {
      debugger;
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
          fileSize={uploadingFileState.serializedFile.size}
          fileName={uploadingFileState.serializedFile.name}
          progress={uploadingFileState.progress}
          onCancelUpload={() => {
            const x = uploadingFilesExtraOptions[uploadingFileState.requestId];
            debugger;
            uploadingFilesExtraOptions[uploadingFileState.requestId].abort();
          }}
          classNames='[&:not(:last-child)]:mb-2'
        />
      ))}
      {uUploadFilesQueue.map(queueFile => (
        <UploadingDocumentStatus
          key={queueFile.id}
          fileSize={queueFile.size}
          fileName={queueFile.name}
          progress={PENDING_UPLOAD}
          onCancelUpload={() => dispatch(removeQueuedFile({ fileId: queueFile.id }))}
          classNames='[&:not(:last-child)]:mb-2'
        />
      ))}
    </div>
  );
};
