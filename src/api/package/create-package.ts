import { createRequest, ProtectedEndpoint } from '@/api/api';

interface CreatePackagePayload {

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
