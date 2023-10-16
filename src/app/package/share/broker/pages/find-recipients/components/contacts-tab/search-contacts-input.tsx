'use client';

import { useAppSelector } from '@/redux/hooks';
import { searchContacts } from '@/redux/features/share-package/thunks/search-contacts.thunk';
import {
  selectContactsSearchValue,
  selectIsSearchingContacts,
} from '@/redux/features/share-package/selectors/find-recipients/contacts.selectors';
import { SearchRecipientsInput } from '@/app/package/share/broker/pages/find-recipients/components/common/search-recipients-input';
import { selectSelectedRecipients } from '@/redux/features/share-package/selectors/find-recipients.selectors';
import { removeRecipient } from '@/redux/features/share-package/share-package';

export const SearchContactsInput = () => {
  const selectedContacts = useAppSelector(selectSelectedRecipients);
  const isSearchingContacts = useAppSelector(selectIsSearchingContacts);
  const searchValue = useAppSelector(selectContactsSearchValue);

  return (
    <SearchRecipientsInput
      placeholder="Enter an email address or contact"
      isSearching={isSearchingContacts}
      recipients={selectedContacts}
      removeRecipientAction={removeRecipient}
      searchRecipientAction={searchContacts}
      searchValue={searchValue}
    />
  );
};
