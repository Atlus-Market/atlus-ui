import { Contact } from '@/models/contact';
import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';

export interface GetContactsResponse {
  contacts: Contact[];
}

export const getContacts = async (
  searchValue = '',
  signal?: AbortSignal
): Promise<GetContactsResponse> => {
  return createRequest<void, GetContactsResponse>({
    url: `/user/contacts?q=${searchValue ?? ''}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.True,
    signal: signal || undefined,
  }).then(getResponseData);
};
