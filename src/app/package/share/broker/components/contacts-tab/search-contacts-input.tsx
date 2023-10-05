'use client';

import { useAppSelector } from '@/redux/hooks';
import { searchContacts } from '@/redux/features/share-package/thunks/search-contacts.thunk';
import {
  selectContactsSearchValue,
  selectIsSearchingContacts,
  selectSelectedContacts,
} from '@/redux/features/share-package/selectors/find-recipients/contacts.selectors';
import { SearchRecipientsInput } from '@/app/package/share/broker/components/commom/search-recipients-input';
import { removeSelectedContact } from '@/redux/features/share-package/share-package';

export const SearchContactsInput = () => {
  const selectedContacts = useAppSelector(selectSelectedContacts);
  const isSearchingContacts = useAppSelector(selectIsSearchingContacts);
  const searchValue = useAppSelector(selectContactsSearchValue);

  return (
    <SearchRecipientsInput
      placeholder="Enter an email address or contact"
      isSearching={isSearchingContacts}
      recipients={selectedContacts}
      removeRecipientAction={removeSelectedContact}
      searchRecipientAction={searchContacts}
      searchValue={searchValue}
    />
  );
};
