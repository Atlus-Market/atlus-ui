import { createRequest, ProtectedEndpoint } from '@/api/api';

export interface CreateSellerPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
}

export interface CreateSellerResponse {
  userId: string;
}

export const createSeller = (userPayload: CreateSellerPayload): Promise<CreateSellerResponse> => {
  return createRequest<CreateSellerPayload, CreateSellerResponse>('/user/seller', 'POST', ProtectedEndpoint.True, userPayload);
};
