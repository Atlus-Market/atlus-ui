import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';
import { Package } from '@/models/package';
import { Visibility } from '@/components/common/dropdown/visibility-options';

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
  keywords: string[];
  products: string[];
  industryIds: number[];
  visibility: Visibility;
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
  }).then(getResponseData);
};
