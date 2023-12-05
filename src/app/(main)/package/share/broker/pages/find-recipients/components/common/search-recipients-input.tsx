'use client';

import { AtlusInput } from '@/components/ui/input/atlus-input';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { ChangeEvent, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import clsx from 'clsx';
import { atlusMediumModalBodyPx } from '@/components/ui/modal/atlus-modal-body';
import { useAppDispatch } from '@/redux/hooks';
import { Action } from 'redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { RecipientsTagsList } from '@/app/(main)/package/share/broker/pages/find-recipients/components/common/recipients-tags-list';
import { Recipient } from '@/redux/features/share-package/slices/recipient';

interface SearchRecipientsInputProps {
  placeholder: string;
  recipients: Recipient[];
  isSearching: boolean;
  searchRecipientAction: (searchValue: string) => AsyncThunkAction<any, any, any>;
  removeRecipientAction: (data: { id: string }) => Action;
  resetSearchAction: () => Action;
}

export const SearchRecipientsInput = ({
  recipients,
  isSearching,
  placeholder,
  searchRecipientAction,
  removeRecipientAction,
  resetSearchAction,
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
      const searchValue = e?.target?.value?.trim() ?? '';
      if (searchValue.length === 0) {
        dispatch(resetSearchAction());
        return;
      } else {
        // @ts-ignore
        activeThunk.current = dispatch(searchRecipientAction(searchValue));
      }
    },
    [dispatch, resetSearchAction, searchRecipientAction]
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
      wrapperClassName={clsx('!mb-[10px]', atlusMediumModalBodyPx)}
      leftCmp={<RecipientsTagsList recipients={recipients} onRemoveRecipient={removeRecipient} />}
      rightIcon={rightIcon}
    />
  );
};
