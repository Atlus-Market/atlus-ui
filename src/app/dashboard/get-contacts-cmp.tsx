'use client';

import { getContacts } from '@/api/contacts/get-contacts';

export const GetContactsCmp = () => {

  return (
    <div>
      <button className='m-5' onClick={() => {
        getContacts();
      }}>Get contacts
      </button>
    </div>
  );
};
