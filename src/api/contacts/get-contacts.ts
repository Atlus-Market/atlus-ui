import { sleep } from '@/utils/sleep';
import { Contact } from '@/models/contact';

export interface GetContactsResponse {
  contacts: Contact[];
}

export const getContacts = async (): Promise<GetContactsResponse> => {
  await sleep(1000);
  return {
    contacts: [
      {
        contactId: '1',
        firstName: 'Contact',
        lastName: 'Number 1',
        companyName: 'Company 1'
      },
      {
        contactId: '2',
        firstName: 'Contact',
        lastName: 'Number 2',
        companyName: 'Company 2'
      }
    ]
  };
  // return createRequest<void, void>('/user/contacts', 'GET', ProtectedEndpoint.True);
};
