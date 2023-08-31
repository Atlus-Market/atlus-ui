import { createRequest, ProtectedEndpoint } from '@/api/api';
import { SearchPatentsResponse } from '@/api/patents/search-patents-response';

interface UploadPatentsFilePayload {
  file: File;
}

type UploadPatentsFileResponse = SearchPatentsResponse

export const uploadPatentsFile = ({ file }: UploadPatentsFilePayload, abortSignal?: AbortSignal) => {
  const headers = {
    'content-type': 'multipart/form-data'
  };

  const formData = new FormData();
  formData.append('file', file);

  return createRequest<unknown, UploadPatentsFileResponse>({
    url: '/patent/upload',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: formData,
    headers,
    signal: abortSignal
  });
};
