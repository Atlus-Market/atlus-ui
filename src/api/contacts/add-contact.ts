import { createRequest, ProtectedEndpoint } from '@/api/api';

export interface AddContactPayload {
  userId: string;
}

export const addContact = (addContactPayload: AddContactPayload): Promise<void> => {
  return createRequest<void, void>({
    url: `/user/${addContactPayload.userId}/contacts`,
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
  });
};
