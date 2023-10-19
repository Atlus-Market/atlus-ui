import { createRequest, ProtectedEndpoint } from '@/api/api';
import { BinaryContent } from '@/types';

export interface DownloadDataroomFilesRequestPayload {
  fileIds: string[];
}

export const downloadDataroomFiles = (
  directoryTreeId: string,
  payload: DownloadDataroomFilesRequestPayload
): Promise<Blob> => {
  return createRequest<DownloadDataroomFilesRequestPayload, BinaryContent>({
    url: `/dataroom/${directoryTreeId}/files/download`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    responseType: 'arraybuffer',
    data: payload,
  }).then(zipFileContent => new Blob([zipFileContent.data ?? ''], { type: 'application/zip' }));
};
