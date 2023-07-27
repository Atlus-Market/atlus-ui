'use client';

import {
  AtlusDropdownList,
  DropdownOption
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import {
  AddContactOption
} from '@/app/set-package/(pages)/package-details/contacts/add-contact-button';
import {
  AddContactModal
} from '@/app/set-package/(pages)/package-details/contacts/add-contact/add-contact-modal';
import { useToggle } from '@uidotdev/usehooks';
import { useQuery } from '@tanstack/react-query';
import { getContacts } from '@/api/contacts/get-contacts';
import { useMemo } from 'react';
import { AtlusContact } from '@/components/ui/contact/atlus-contact';

interface SellerSelectorProps {

}

export const ContactsSelector = ({}: SellerSelectorProps) => {
  const [isOpen, setIsOpen] = useToggle(false);

  const { refetch, isRefetching, isFetching, data } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
    refetchOnWindowFocus: true
  });

  const contactOptions = useMemo<DropdownOption[]>(() => {
    if (!data) {
      return [];
    }
    const contactsOptions = data.contacts.map(c => ({
      value: c.contactId,
      label: <AtlusContact contact={c} />
    }));

    return [
      {
        options: contactsOptions,
        label: 'Contacts',
        value: 'contacts'
      }
    ];
  }, [data]);

  console.log('data: ', data);

  return (
    <>
      <AddContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <AtlusDropdownList
        options={contactOptions}
        groupHeadingHeader={<AddContactOption onClick={() => setIsOpen(true)} />}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </>

  );
};
