import { createRequest, ProtectedEndpoint } from '@/api/api';
import { BinaryContent } from '@/types';

export const downloadDataroomFile = (directoryTreeId: string, fileId: string): Promise<Blob> => {
  return createRequest<void, BinaryContent>({
    url: `/dataroom/${directoryTreeId}/file/${fileId}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    responseType: 'arraybuffer',
  }).then(response => {
    const fileType = (response.headers['content-type'] as string) ?? '';
    return new Blob([response.data ?? ''], { type: fileType });
  });
};
