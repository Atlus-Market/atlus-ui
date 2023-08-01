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
import { useQuery } from '@tanstack/react-query';
import { getContacts } from '@/api/contacts/get-contacts';
import { useCallback, useEffect, useMemo } from 'react';
import { AtlusContact } from '@/components/ui/contact/atlus-contact';
import { Contact } from '@/models/contact';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { HiSearch, HiX } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  hideSetContactModal,
  setActiveContact,
  setContacts,
  showSetContactModal
} from '@/redux/features/set-package/set-package';
import {
  selectActiveContact,
  selectIsSetContactModalOpen
} from '@/redux/features/set-package/selectors/package-details.selectors';
import { HiPencil } from 'react-icons/hi2';
import { ActiveContact } from '@/app/set-package/(pages)/package-details/contacts/active-contact';

interface SellerSelectorProps {
  onSellerSelected: (sellerId: string) => void;
  selectedSellerId: string | undefined;
}

export const ContactsSelector = ({ onSellerSelected, selectedSellerId }: SellerSelectorProps) => {
  const dispatch = useAppDispatch();
  const isSetContactModalOpen = useAppSelector(selectIsSetContactModalOpen);
  const activeContact = useAppSelector(selectActiveContact);
  const isSellerSelected = !!selectedSellerId;

  console.log('activeContact: ', activeContact);

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
      value: c.id,
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

  useEffect(() => {
    dispatch(setContacts({ contacts: [] }));
  }, [data]);

  console.log('options: ', contactOptions);

  const addContactElement = <AddContactOption onClick={() => {
    dispatch(setActiveContact({ contactId: undefined }));
    dispatch(showSetContactModal());
  }} />;

  return (
    <>
      <AddContactModal
        isOpen={isSetContactModalOpen}
        onClose={() => dispatch(hideSetContactModal())}
        initialValues={activeContact}
      />
      <AtlusDropdownList
        label='Contacts'
        isLoading={isFetching}
        isSearchable={!isSellerSelected}
        placeholder='Search contacts...'
        leftIcon={<HiSearch size={20} color='#A4A2A0' />}
        filterOption={customFilter}
        options={contactOptions}
        indicatorsExtraCmp={
          !isFetching && isSellerSelected &&
          <button
            className='mr-2'
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(setActiveContact({ contactId: selectedSellerId }));
              dispatch(showSetContactModal());
            }}>
            <HiPencil size={18} color='var(--color-orange)' />
          </button>
        }
        isClearable={isSellerSelected}
        clearIndicator={isSellerSelected &&
          <button><HiX size={24} color='var(--color-orange)' /></button>}
        showDropdownIndicator={!isSellerSelected}
        defaultValue={selectedSellerId}
        groupHeadingHeader={<div className='pt-[10px] pb-5'>{addContactElement}</div>}
        noOptionsMessage={<div className='px-4 py-[10px]'>{addContactElement}</div>}
        onChange={(value) => {
          onSellerSelected(value);
          dispatch(setActiveContact({ contactId: value }));
        }}
      />
      {activeContact && <ActiveContact contact={activeContact} />}
    </>

  );
};
