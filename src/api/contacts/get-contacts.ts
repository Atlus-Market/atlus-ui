import { Contact } from '@/models/contact';
import { sleep } from '@/utils/sleep';

export interface GetContactsResponse {
  contacts: Contact[];
}

export const getContacts = async (): Promise<GetContactsResponse> => {
  await sleep(1000);
  return {
    contacts: [
      {
        id: '1',
        firstName: 'Contact',
        lastName: 'Number 1',
        companyName: 'Company 1',
        email: ''
      },
      {
        id: '2',
        firstName: 'Contact',
        lastName: 'Number 2',
        companyName: 'Company 2',
        email: ''
      }
    ]
  };
  // return createRequest<void, GetContactsResponse>('/user/contacts?q=', 'GET', ProtectedEndpoint.True);
};
