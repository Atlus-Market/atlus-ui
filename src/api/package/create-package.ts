import { createRequest, ProtectedEndpoint } from '@/api/api';

interface CreatePackagePayload {

}

export const createPackage = (data: CreatePackagePayload) => {
  return createRequest<CreatePackagePayload, void>(
    '/package',
    'POST',
    ProtectedEndpoint.True,
    data
  );
};
