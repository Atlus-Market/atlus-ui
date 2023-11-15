'use client';

import {
  CustomMultiComponent,
  DropdownOption,
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { SelectedRecipient } from '@/app/package/share/components/common/selectedRecipient';
import { isCustomRecipient, Recipient } from '@/redux/features/share-package/slices/recipient';
import { useAppDispatch } from '@/redux/hooks';
import { searchBuyerContacts } from '@/redux/features/share-package/thunks/search-buyer-contacts.thunk';
import { useCallback, useRef } from 'react';
import { AtlusContact } from '@/components/common/atlus-contact';
import { AtlusFormDropdownList } from '@/components/ui/form/atlus-form-dropdown';
import { isValidEmail } from '@/utils/email';

const recipientSubLines = (recipient: Recipient) => {
  if (isCustomRecipient(recipient)) {
    return [];
  }
  return [recipient.email];
};

const createRecipientFromEmail = (email: string): Recipient => {
  return {
    id: email,
    companyName: '',
    email,
    firstName: email,
    lastName: '',
  };
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

const mapRecipientsToOptions = (recipient: Recipient[]): DropdownOption<string>[] => {
  return recipient.map(contact => ({
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

        if (contacts.length) {
          return mapRecipientsToOptions(contacts);
        }

        const isEmail = isValidEmail(searchValue);
        if (isEmail) {
          const recipient = createRecipientFromEmail(searchValue);
          return mapRecipientsToOptions([recipient]);
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
