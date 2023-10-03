'use client';

import { AtlusInput } from '@/components/ui/input/atlus-input';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { searchContacts } from '@/redux/features/share-package/thunks/search-contacts.thunk';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { removeSelectedContact } from '@/redux/features/share-package/share-package';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import {
  selectIsSearchingContacts,
  selectSelectedContacts,
} from '@/redux/features/share-package/selectors/find-recipients/contacts.selectors';

export const SearchContactsInput = () => {
  const dispatch = useAppDispatch();
  const selectedContacts = useAppSelector(selectSelectedContacts);
  const isSearchingContacts = useAppSelector(selectIsSearchingContacts);
  const activeThunk = useRef<any | null>();

  useEffect(() => {
    // @ts-ignore
    activeThunk.current = dispatch(searchContacts(''));
  }, [dispatch]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | undefined) => {
      activeThunk.current?.abort?.();
      console.log('debouncedOnChange: ', e?.target?.value);
      // @ts-ignore
      activeThunk.current = dispatch(searchContacts(e?.target?.value ?? ''));
    },
    [dispatch]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangedDebounced = useCallback(debounce(onChange, 200), [onChange]);

  const selectedContactsTags = useMemo(() => {
    return selectedContacts.map(contact => (
      <AtlusTag
        key={contact.id}
        text={
          <span>
            {contact.firstName} {contact.lastName}
          </span>
        }
        size="small"
        onClose={() => dispatch(removeSelectedContact({ contactId: contact.id }))}
      />
    ));
  }, [dispatch, selectedContacts]);

  const hasSelectedContacts = selectedContacts.length > 0;
  return (
    <AtlusInput
      placeholder={!hasSelectedContacts ? 'Enter an email address or contact' : undefined}
      onChange={onChangedDebounced}
      wrapperClassName="!mb-0"
      leftCmp={selectedContactsTags}
      rightIcon={isSearchingContacts && <AtlusLoadingSpinner color="orange" />}
    />
  );
};
