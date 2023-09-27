import { createRequest, ProtectedEndpoint } from '@/api/api';
import { BinaryContent } from '@/types';
import { AxiosResponse } from 'axios/index';

export type ExportPackageToCSVResponse = Blob;

export const exportPackageToCSV = (packageId: string): Promise<ExportPackageToCSVResponse> => {
  return createRequest<void, AxiosResponse<BinaryContent>>({
    url: `/package/${packageId}/export-csv`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    responseType: 'arraybuffer',
    returnRawResponse: true,
  }).then(response => {
    const fileType = (response.headers['content-type'] as string) ?? '';
    return new Blob([response.data ?? ''], { type: fileType });
  });
};
