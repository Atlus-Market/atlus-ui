import { createRequest, ProtectedEndpoint } from '@/api/api';

interface UploadPatentsFilePayload {
  file: File;
  abortSignal?: AbortSignal;
}

export const uploadPatentsFile = ({
  file,
  abortSignal,
}: UploadPatentsFilePayload) => {
  const headers = {
    'content-type': 'multipart/form-data',
  };

  const formData = new FormData();
  formData.append('file', file);

  return createRequest({
    url: '/patent/upload',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: formData,
    headers,
    signal: abortSignal,
  });
};
