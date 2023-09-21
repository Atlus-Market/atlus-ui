import { createRequest, ProtectedEndpoint } from '@/api/api';

export interface DownloadDataroomFilesRequestPayload {
  fileIds: string[];
}

type BinaryZipContent = string;

export const downloadDataroomFiles = (
  directoryTreeId: string,
  payload: DownloadDataroomFilesRequestPayload
): Promise<Blob> => {
  return createRequest<DownloadDataroomFilesRequestPayload, BinaryZipContent>({
    url: `/dataroom/${directoryTreeId}/files/download`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    responseType: 'arraybuffer',
    data: payload,
  }).then(zipFileContent => new Blob([zipFileContent ?? ''], { type: 'application/zip' }));
};
