'use client';

import { AtlusInput } from '@/components/ui/input/atlus-input';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { debounce } from 'lodash';
import clsx from 'clsx';
import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';
import { searchDirectories } from '@/redux/features/share-package/thunks/search-directories.thunk';
import { useAppDispatch } from '@/redux/hooks';
import { Action } from 'redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { Recipient } from '@/app/package/share/broker/components/recipients-list';

interface SearchRecipientsInputProps {
  placeholder: string;
  recipients: Recipient[];
  isSearching: boolean;
  searchRecipientAction: (searchValue: string) => AsyncThunkAction<any, any, any>;
  removeRecipientAction: (data: { id: string }) => Action;
}

export const SearchRecipientsInput = ({
  recipients,
  isSearching,
  placeholder,
  searchRecipientAction,
  removeRecipientAction,
}: SearchRecipientsInputProps) => {
  const dispatch = useAppDispatch();
  const activeThunk = useRef<any | null>();

  useEffect(() => {
    // @ts-ignore
    activeThunk.current = dispatch(searchDirectories(''));
  }, [dispatch]);

  const removeRecipient = useCallback(
    (recipientId: string) => {
      dispatch(removeRecipientAction({ id: recipientId }));
    },
    [dispatch, removeRecipientAction]
  );

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | undefined) => {
      activeThunk.current?.abort?.();
      const searchValue = e?.target?.value ?? '';
      // @ts-ignore
      activeThunk.current = dispatch(searchRecipientAction(searchValue));
    },
    [dispatch, searchRecipientAction]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangedDebounced = useCallback(debounce(onInputChange, 200), [onInputChange]);

  const selectedRecipientsTags = useMemo(() => {
    return recipients.map(recipient => (
      <AtlusTag
        key={recipient.id}
        text={
          <span>
            {recipient.firstName} {recipient.lastName}
          </span>
        }
        size="small"
        onClose={() => removeRecipient(recipient.id)}
      />
    ));
  }, [removeRecipient, recipients]);

  const hasRecipients = recipients.length > 0;
  return (
    <AtlusInput
      placeholder={!hasRecipients ? placeholder : undefined}
      onChange={onChangedDebounced}
      wrapperClassName={clsx('!mb-[10px]', atlusModalBodyPaddingX)}
      leftCmp={selectedRecipientsTags}
      rightIcon={isSearching && <AtlusLoadingSpinner color="orange" />}
    />
  );
};
