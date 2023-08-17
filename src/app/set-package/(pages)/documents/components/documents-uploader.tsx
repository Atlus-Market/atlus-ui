'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectDocumentsToUpload,
  selectUploadingFiles,
  selectUploadingFilesRequestIds,
} from '@/redux/features/set-package/selectors/documents.selectors';
import { useEffect } from 'react';
import { useConst } from '@/hooks/use-const';
import { uploadPackageDocument } from '@/redux/features/set-package/thunks/documents.thunks';
import { UploadingDocumentStatus } from '@/app/set-package/(pages)/documents/components/uploading-document/uploading-document-status';

type Abort = (reason?: string) => void;

interface UploadingFilesExtraOption {
  [requestId: string]: { abort: Abort };
}

export const DocumentsUploader = () => {
  const dispatch = useAppDispatch();
  const uploadingFilesState = useAppSelector(selectUploadingFiles);
  const uploadFilesQueue = useAppSelector(selectUploadFilesQueue);
  const filesToUpload = useAppSelector(selectDocumentsToUpload);
  const uploadingFilesRequestIds = useAppSelector(
    selectUploadingFilesRequestIds
  );
  const uploadingFilesExtraOptions = useConst<UploadingFilesExtraOption>({});

  console.group('Documents Uploader');
  console.log('uploadingFiles: ', uploadingFilesState);
  console.log('uploadFilesQueue: ', uploadFilesQueue);
  console.log('uploadingFilesExtraOptions: ', uploadingFilesLocalState);
  console.log('filesToUpload: ', filesToUpload);
  console.groupEnd();

  useEffect(() => {
    filesToUpload.forEach(serializedFileUpload => {
      // @ts-ignore
      const thunkValue = dispatch(uploadPackageDocument(serializedFileUpload));
      uploadingFilesExtraOptions[thunkValue.requestId] = {
        abort: thunkValue.abort,
      };
    });
  }, [dispatch, filesToUpload, uploadingFilesLocalState]);

  // Clean up requestsIds that are no longer running
  // useEffect(() => {
  //   const uploadingRequestIds = uploadingFilesState.map(uploadFileState => uploadFileState.requestId);
  //   Object.keys(uploadingFilesLocalState).forEach(requestId => {
  //     if (!uploadingRequestIds.includes(requestId)) {
  //       debugger;
  //       delete uploadingFilesLocalState[requestId];
  //     }
  //   });
  // }, [uploadingFilesLocalState, uploadingFilesState]);

  // Cancel all uploads on unmount
  useEffect(() => {
    return () => {
      Object.values(uploadingFilesLocalState).forEach(extraOptions =>
        extraOptions.abort()
      );
    };
  }, [uploadingFilesLocalState]);

  const isUploadingFiles = uploadingFilesState.length > 0;

  if (!isUploadingFiles) {
    return null;
  }

  return (
    <div className="mt-3">
      {uploadingFilesState.map(uploadingFileState => (
        <UploadingDocumentStatus
          key={uploadingFileState.requestId}
          fileSize={uploadingFileState.serializedFile.size}
          fileName={uploadingFileState.serializedFile.name}
          progress={uploadingFileState.progress}
          onCancelUpload={() => {
            uploadingFilesLocalState[uploadingFileState.requestId].abort();
          }}
          classNames="[&:not(:last-child)]:mb-2"
        />
      ))}
      {uploadFilesQueue.map(queueFile => (
        <UploadingDocumentStatus
          key={queueFile.id}
          fileSize={queueFile.size}
          fileName={queueFile.name}
          progress={PENDING_UPLOAD}
          onCancelUpload={() =>
            dispatch(removeQueuedFile({ fileId: queueFile.id }))
          }
          classNames="[&:not(:last-child)]:mb-2"
        />
      ))}
    </div>
  );
};
