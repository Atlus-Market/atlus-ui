'use client';

import { AtlusInput } from '@/components/ui/input/atlus-input';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { debounce } from 'lodash';
import clsx from 'clsx';
import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';
import { useAppDispatch } from '@/redux/hooks';
import { Action } from 'redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { Recipient } from '@/app/package/share/broker/components/recipients-list';
import { AtlusContact } from '@/components/common/atlus-contact';
import { AtlusAvatar } from '@/components/common/atlus-avatar';

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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchAll = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    // @ts-ignore
    activeThunk.current = dispatch(searchRecipientAction(''));
  }, [dispatch, searchRecipientAction]);

  useEffect(() => {
    searchAll();
  }, []);

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
          <div className="flex items-center gap-2">
            <AtlusAvatar size="small" /> {recipient.firstName} {recipient.lastName}
          </div>
        }
        size="small"
        onClose={() => removeRecipient(recipient.id)}
      />
    ));
  }, [removeRecipient, recipients]);
  const hasRecipients = recipients.length > 0;

  let rightIcon = null;
  if (isSearching) {
    rightIcon = <AtlusLoadingSpinner color="orange" />;
  }
  // else if (searchValue) {
  //   rightIcon = (
  //     <button>
  //       <HiX onClick={searchAll} />
  //     </button>
  //   );
  // }

  return (
    <AtlusInput
      placeholder={!hasRecipients ? placeholder : undefined}
      onChange={onChangedDebounced}
      wrapperClassName={clsx('!mb-[10px]', atlusModalBodyPaddingX)}
      leftCmp={selectedRecipientsTags}
      rightIcon={rightIcon}
      ref={inputRef}
    />
  );
};
