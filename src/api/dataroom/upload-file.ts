import { createRequest, getProgressPercent, ProtectedEndpoint } from '@/api/api';
import { AxiosProgressEvent } from 'axios';
import { throttle } from 'lodash';
import { noop } from '@/utils/noop';

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

  let updateProgress: (progressEvent: AxiosProgressEvent) => void = noop()
  if (onProgress) {
    updateProgress = throttle(function(progressEvent: AxiosProgressEvent) {
      const percentCompleted = getProgressPercent(progressEvent);
      console.log('uploadPackageDocumentFile::percentCompleted: ', progressEvent);
      onProgress?.(percentCompleted);
    }, 1000);
  }

  return createRequest({
    url: `/dataroom/${dataroomId}/upload`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: formData,
    headers,
    onUploadProgress: updateProgress,
    signal: abortSignal
  });
};
