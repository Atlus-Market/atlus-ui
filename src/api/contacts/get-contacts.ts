import { Contact } from '@/models/contact';
import { createRequest, ProtectedEndpoint } from '@/api/api';

export interface GetContactsResponse {
  contacts: Contact[];
}

export const getContacts = async (): Promise<GetContactsResponse> => {
  return createRequest<void, GetContactsResponse>({
    url: '/user/contacts?q=',
    method: 'GET',
    isProtected: ProtectedEndpoint.True
  });
};
