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
import { useCallback, useMemo } from 'react';
import { AtlusContact } from '@/components/ui/contact/atlus-contact';
import { Contact } from '@/models/contact';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { HiSearch } from 'react-icons/hi';

interface SellerSelectorProps {
  onSellerSelected: (sellerId: string) => void;
  selectedSellerId: string | undefined;
}

export const ContactsSelector = ({ onSellerSelected, selectedSellerId }: SellerSelectorProps) => {
  const [isOpen, setIsOpen] = useToggle(false);
  const [isSellerSelected, setIsSellerSelected] = useToggle(false);

  const { isFetching, data } = useQuery({
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
      data: {
        contact: c
      },
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

  const customFilter = useCallback((option: FilterOptionOption<DropdownOption>, input: string) => {
    if (input) {
      const contact = option.data.data?.contact as Contact;
      return contact && [contact.firstName, contact.lastName, contact.companyName].some(contactValue => new RegExp(input, 'ig').test(contactValue));
    }
    return true; // if not search, then all match
  }, []);

  return (
    <>
      <AddContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <AtlusDropdownList
        label='Contacts'
        isLoading={isFetching}
        isSearchable={!isSellerSelected}
        placeholder='Search contacts...'
        leftIcon={<HiSearch size={20} color='#A4A2A0' />}
        filterOption={customFilter}
        options={contactOptions}
        defaultValue={selectedSellerId}
        groupHeadingHeader={<AddContactOption onClick={() => setIsOpen(true)} />}
        onChange={(value) => {
          console.log(value);
          onSellerSelected(value);
          setIsSellerSelected(true);
        }}
      />
    </>

  );
};
