import { createRequest, ProtectedEndpoint } from '@/api/api';

export const removeFile = (dataroomId: string, documentId: string): Promise<void> => {
  return createRequest<void, void>({
    url: `/dataroom/${dataroomId}/file/${documentId}`,
    method: 'DELETE',
    isProtected: ProtectedEndpoint.True
  });
};
