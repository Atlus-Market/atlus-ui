import { createRequest, ProtectedEndpoint } from '@/api/api';

export interface DownloadDataroomFilesRequestPayload {
  fileIds: string[];
}

export type BinaryZipContent = string;

export const downloadDataroomFiles = (
  directoryTreeName: string,
  payload: DownloadDataroomFilesRequestPayload
): Promise<BinaryZipContent> => {
  return createRequest<DownloadDataroomFilesRequestPayload, BinaryZipContent>({
    url: `/dataroom/${directoryTreeName}/files/download`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    data: payload,
  });
};
