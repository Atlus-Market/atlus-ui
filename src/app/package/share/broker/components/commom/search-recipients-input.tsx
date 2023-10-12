'use client';

import { AtlusInput } from '@/components/ui/input/atlus-input';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import clsx from 'clsx';
import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';
import { useAppDispatch } from '@/redux/hooks';
import { Action } from 'redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { Recipient } from '@/app/package/share/broker/components/commom/recipients-list';
import { RecipientsTagsList } from '@/app/package/share/broker/components/commom/recipients-tags-list';

interface SearchRecipientsInputProps {
  placeholder: string;
  recipients: Recipient[];
  isSearching: boolean;
  searchRecipientAction: (searchValue: string) => AsyncThunkAction<any, any, any>;
  removeRecipientAction: (data: { id: string }) => Action;
  searchValue: string;
}

export const SearchRecipientsInput = ({
  recipients,
  isSearching,
  placeholder,
  searchRecipientAction,
  removeRecipientAction,
  searchValue,
}: SearchRecipientsInputProps) => {
  const dispatch = useAppDispatch();
  const activeThunk = useRef<any | null>();
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
  const hasRecipients = recipients.length > 0;

  let rightIcon = null;
  if (isSearching) {
    rightIcon = <AtlusLoadingSpinner color="orange" />;
  }

  return (
    <AtlusInput
      placeholder={!hasRecipients ? placeholder : undefined}
      onChange={onChangedDebounced}
      wrapperClassName={clsx('!mb-[10px]', atlusModalBodyPaddingX)}
      leftCmp={<RecipientsTagsList recipients={recipients} onRemoveRecipient={removeRecipient} />}
      rightIcon={rightIcon}
    />
  );
};
