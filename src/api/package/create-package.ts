import { createRequest, ProtectedEndpoint } from '@/api/api';

export interface CustomPatent {
  patentNumber: string;
  application_number: string;
  title: string;
  status: string;
  assignee: string;
  application_date: string; //'2023-08-22'
}

export interface CreatePackagePayload {
  'seller_user_id': string;
  'title': string;
  'description': string;
  'keywords': string; // comma separated words
  'industry_id': number;
  'visibility': 0 | 1; // true|false
  'patents': string[]; // patents IDs
  'custom_patents': CustomPatent[];
}

export const createPackage = (data: CreatePackagePayload) => {
  return createRequest<CreatePackagePayload, void>({
      url: '/package',
      method: 'POST',
      isProtected: ProtectedEndpoint.True,
      payload: data
    }
  );
};
