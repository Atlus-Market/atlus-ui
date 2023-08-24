import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Package } from '@/models/package';
import { CreatePackageRequestPayload } from '@/api/package/create-package';

export interface CustomPatent {
  patentNumber: string;
  application_number: string;
  title: string;
  status: string;
  assignee: string;
  application_date: string; //'2023-08-22'
}

export type UpdatePackageRequestPayload = CreatePackageRequestPayload;

interface UpdatePackageResponsePayload {
  package: Package;
}

export const updatePackage = (packageId: string, updatePackagePayload: UpdatePackageRequestPayload) => {
  return createRequest<UpdatePackageRequestPayload, UpdatePackageResponsePayload>({
      url: `/package/${packageId}`,
      method: 'PUT',
      isProtected: ProtectedEndpoint.True,
      payload: updatePackagePayload
    }
  );
};
