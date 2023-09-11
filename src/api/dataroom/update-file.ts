import { createRequest, ProtectedEndpoint } from '@/api/api';

export interface UpdateFileRequestPayload {
  private: boolean;
}

export const updateFile = (
  updateFileRequestPayload: UpdateFileRequestPayload,
  dataroomId: string,
  documentId: string
): Promise<void> => {
  return createRequest<UpdateFileRequestPayload, void>({
    url: `/dataroom/${dataroomId}/file/${documentId}`,
    method: 'PUT',
    isProtected: ProtectedEndpoint.True,
    data: updateFileRequestPayload,
  });
};
