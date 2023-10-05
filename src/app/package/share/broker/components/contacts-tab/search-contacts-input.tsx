'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { searchContacts } from '@/redux/features/share-package/thunks/search-contacts.thunk';
import {
  selectIsSearchingContacts,
  selectSelectedContacts,
} from '@/redux/features/share-package/selectors/find-recipients/contacts.selectors';
import { SearchRecipientsInput } from '@/app/package/share/commom/search-recipients-input';
import { removeSelectedContact } from '@/redux/features/share-package/share-package';

export const SearchContactsInput = () => {
  const dispatch = useAppDispatch();
  const selectedContacts = useAppSelector(selectSelectedContacts);
  const isSearchingContacts = useAppSelector(selectIsSearchingContacts);
  const activeThunk = useRef<any | null>();

  useEffect(() => {
    // @ts-ignore
    activeThunk.current = dispatch(searchContacts(''));
  }, [dispatch]);

  const removeContact = useCallback(
    (contactId: string) => {
      dispatch(removeSelectedContact({ contactId }));
    },
    [dispatch]
  );

  const onSearchInputChange = useCallback(
    (searchValue: string) => {
      activeThunk.current?.abort?.();
      // @ts-ignore
      activeThunk.current = dispatch(searchContacts(searchValue));
    },
    [dispatch]
  );

  return (
    <SearchRecipientsInput
      placeholder="Enter an email address or contact"
      isSearching={isSearchingContacts}
      recipients={selectedContacts}
      onRemoveRecipient={removeContact}
      onSearchInputChange={onSearchInputChange}
    />
  );
};
