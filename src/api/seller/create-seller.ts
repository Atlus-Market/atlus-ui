import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Contact } from '@/models/contact';

export type CreateSellerPayload = Omit<Contact, 'id'>

export interface CreateSellerResponse {
  userId: string;
}

export const createSeller = (userPayload: CreateSellerPayload): Promise<CreateSellerResponse> => {
  return createRequest<CreateSellerPayload, CreateSellerResponse>('/user/seller', 'POST', ProtectedEndpoint.True, userPayload);
};
