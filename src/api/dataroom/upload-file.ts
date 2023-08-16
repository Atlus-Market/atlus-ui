import { createRequest, ProtectedEndpoint } from '@/api/api';

interface UploadPackageDocumentPayload {
  dataroomId: string;
  file: File;
  folder?: string;
}

export const uploadPackageDocumentFile = ({
                                            dataroomId,
                                            file,
                                            folder = ''
                                          }: UploadPackageDocumentPayload) => {
  const headers = {
    'content-type': 'multipart/form-data'
  };
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const config = {
    onUploadProgress: function(progressEvent: { loaded: number; total: number; }) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(percentCompleted);
    }
  };

  return createRequest({
    url: `/dataroom/${dataroomId}/upload`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: formData,
    headers
  });
};
