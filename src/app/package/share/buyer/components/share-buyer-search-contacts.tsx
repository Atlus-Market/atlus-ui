'use client';

import {
  CustomMultiComponent,
  DropdownOption,
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { SelectedRecipient } from '@/app/package/share/components/common/selectedRecipient';
import { isCustomRecipient, Recipient } from '@/redux/features/share-package/slices/recipient';
import { useAppDispatch } from '@/redux/hooks';
import { searchBuyerContacts } from '@/redux/features/share-package/thunks/search-buyer-contacts.thunk';
import { useCallback, useRef, useState } from 'react';
import { AtlusContact } from '@/components/common/atlus-contact';
import { Contact } from '@/models/contact';
import { AtlusFormDropdownList } from '@/components/ui/form/atlus-form-dropdown';

const recipientSubLines = (recipient: Recipient) => {
  if (isCustomRecipient(recipient)) {
    return [];
  }
  return [recipient.email];
};

const r: Recipient = {
  id: 'a@a.com',
  companyName: '',
  email: 'a@a.com',
  firstName: 'a@a.com',
  lastName: '',
};

const o: DropdownOption<string> = {
  label: <AtlusContact recipient={r} subLines={recipientSubLines(r)} wrapperClassnames="!py-0" />,
  value: r.id,
  data: {
    recipient: r,
  },
};

interface CustomRecipient {
  recipient: Recipient;
}

const DropdownSelectedRecipient = ({ clearValue, data }: CustomMultiComponent) => (
  <SelectedRecipient
    recipient={(data as CustomRecipient).recipient}
    onRemoveRecipient={id => {
      clearValue();
    }}
  />
);

const mapContactToOptions = (contacts: Contact[]): DropdownOption<string>[] => {
  return contacts.map(contact => ({
    label: (
      <AtlusContact
        recipient={contact}
        subLines={recipientSubLines(contact)}
        wrapperClassnames="!py-0"
      />
    ),
    value: contact.email,
    data: {
      recipient: contact,
    },
  }));
};

const NoOptionsMessage = ({ inputValue }: { inputValue: string }) => {
  const text = inputValue?.length > 0 ? 'No contacts found' : 'Search a contact';
  return <span className="text-sm md:text-base text-center block">{text}</span>;
};

export const ShareBuyerSearchContacts = () => {
  const activeThunk = useRef<any | null>();
  const dispatch = useAppDispatch();

  const onInputChange = useCallback(
    async (searchValue: string) => {
      activeThunk.current?.abort?.();
      if (searchValue.length === 0) {
        return [];
      } else {
        // @ts-ignore
        activeThunk.current = dispatch(searchBuyerContacts(searchValue));
        const res = await activeThunk.current;
        const contacts = res.payload;
        console.log('contacts found: ', contacts);

        if (contacts.length) {
          return mapContactToOptions(contacts);
        }
        const isEmail = true;
        if (isEmail) {
          return [o];
        }

        return [];
      }
    },
    [dispatch]
  );

  return (
    <AtlusFormDropdownList
      name="emails"
      isAsync={true}
      isSearchable={true}
      isMulti={true}
      cacheOptions={true}
      wrapperClassName="pb-4 md:pb-5"
      placeholder="Enter an email address"
      noOptionsMessage={NoOptionsMessage}
      loadOptions={async (inputSearch: string) => {
        return (await onInputChange(inputSearch)) || [];
      }}
      customMultiValue={DropdownSelectedRecipient}
    />
  );
};
