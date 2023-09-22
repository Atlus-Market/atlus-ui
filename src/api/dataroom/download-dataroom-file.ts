import { createRequest, ProtectedEndpoint } from '@/api/api';
import { AxiosResponse } from 'axios';
import { BinaryContent } from '@/types';

export const downloadDataroomFile = (directoryTreeId: string, fileId: string): Promise<Blob> => {
  return createRequest<void, AxiosResponse<BinaryContent>>({
    url: `/dataroom/${directoryTreeId}/file/${fileId}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    responseType: 'arraybuffer',
    returnRawResponse: true,
  }).then(response => {
    const fileType = (response.headers['content-type'] as string) ?? '';
    return new Blob([response.data ?? ''], { type: fileType });
  });
};
