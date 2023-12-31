import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Package } from '@/models/package';

export interface CustomPatentPayload {
  patentNumber: string;
  applicationNumber: string;
  title: string;
  status: string;
  assignee: string;
  applicationDate: string; //'2023-08-22'
}

export interface CreatePackageRequestPayload {
  sellerUserId: string;
  title: string;
  description: string;
  keywords: string; // comma separated words
  industryIds: number[];
  visibility: 0 | 1; // true|false
  patents: string[]; // patents IDs
  customPatents: CustomPatentPayload[];
}

interface CreatePackageResponsePayload {
  package: Package;
}

export const createPackage = (createPackageRequestPayload: CreatePackageRequestPayload) => {
  return createRequest<CreatePackageRequestPayload, CreatePackageResponsePayload>({
    url: '/package',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: createPackageRequestPayload,
  });
};
