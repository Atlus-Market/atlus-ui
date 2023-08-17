import { createRequest, getProgressPercent, ProtectedEndpoint } from '@/api/api';
import { AxiosProgressEvent } from 'axios';

interface UploadPackageDocumentPayload {
  dataroomId: string;
  file: File;
  folder?: string;
  onProgress?: (progressCompleted: number) => void;
  abortSignal?: AbortSignal;
}

export const uploadPackageDocumentFile = ({
                                            dataroomId,
                                            file,
                                            folder = '',
                                            onProgress,
                                            abortSignal
                                          }: UploadPackageDocumentPayload) => {
  const headers = {
    'content-type': 'multipart/form-data'
  };
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);


  let updateProgress = onProgress;
  if (onProgress) {
    // updateProgress = debounce(onProgress, 500);
  }

  return createRequest({
    url: `/dataroom/${dataroomId}/upload`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: formData,
    headers,
    onUploadProgress: function(progressEvent: AxiosProgressEvent) {
      const percentCompleted = getProgressPercent(progressEvent);
      console.log('uploadPackageDocumentFile::percentCompleted: ', progressEvent);
      updateProgress?.(percentCompleted);
    },
    signal: abortSignal
  });
};
