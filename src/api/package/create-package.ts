import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Package } from '@/models/package';

export interface CustomPatent {
  patentNumber: string;
  application_number: string;
  title: string;
  status: string;
  assignee: string;
  application_date: string; //'2023-08-22'
}

export interface CreatePackagePayload {
  sellerUserId: string;
  title: string;
  description: string;
  keywords: string; // comma separated words
  industryIds: number[];
  visibility: 0 | 1; // true|false
  patents: string[]; // patents IDs
  custom_patents: CustomPatent[];
}

interface CreatePackageResponsePayload {
  package: Package;
}

export const createPackage = (data: CreatePackagePayload) => {
  return createRequest<CreatePackagePayload, CreatePackageResponsePayload>({
      url: '/package',
      method: 'POST',
      isProtected: ProtectedEndpoint.True,
      payload: data
    }
  );
};
