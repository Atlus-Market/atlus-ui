'use client';

import { AtlusInput } from '@/components/ui/input/atlus-input';
import { ChangeEvent, useCallback } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch } from '@/redux/hooks';
import { searchContacts } from '@/redux/features/share-package/thunks/search-contacts.thunk';

export const SearchContactsInput = () => {
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | undefined) => {
      console.log('debouncedOnChange: ', e?.target?.value);
      // @ts-ignore
      dispatch(searchContacts(e?.target?.value ?? ''));
    },
    [dispatch]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangedDebounced = useCallback(debounce(onChange, 200), [onChange]);

  return (
    <AtlusInput placeholder="Enter an email address or contact" onChange={onChangedDebounced} />
  );
};
