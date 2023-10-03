'use client';

import { AtlusInput } from '@/components/ui/input/atlus-input';
import { ChangeEvent, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch } from '@/redux/hooks';
import { searchContacts } from '@/redux/features/share-package/thunks/search-contacts.thunk';

export const SearchContactsInput = () => {
  const dispatch = useAppDispatch();
  const activeThunk = useRef<any | null>();

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

  return (
    <AtlusInput placeholder="Enter an email address or contact" onChange={onChangedDebounced} />
  );
};
