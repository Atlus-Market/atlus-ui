import { createRequest, ProtectedEndpoint } from '@/api/api';
import { Contact } from '@/models/contact';

export type UpdateSellerPayload = Contact

export const updateSeller = (updateSellerPayload: UpdateSellerPayload): Promise<void> => {
  const { id: sellerId } = updateSellerPayload;
  return createRequest<UpdateSellerPayload, void>(`/user/seller${sellerId}`, 'PUT', ProtectedEndpoint.True, updateSellerPayload);
};
