'use client';

import { useAppDispatch } from '@/redux/hooks';
import { MouseEvent, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { Action } from 'redux';
import { AtlusContact } from '@/components/common/atlus-contact';
import { isValidEmail } from '@/utils/email';
import { setCustomRecipient } from '@/redux/features/share-package/share-package';
import { Recipient } from '@/redux/features/share-package/slices/recipient';
import { atlusMediumModalBodyPx } from '@/components/ui/modal/atlus-modal-body';

interface RecipientsListProps<T extends Recipient> {
  selectRecipientAction: (recipient: T) => Action;
  removeRecipientAction: (payload: { id: string }) => Action;
  recipients: T[];
  customRecipient: T | undefined;
  selectedRecipientsIds: string[];
  recipientSubLinesFn: (recipient: Recipient) => string[];
  searchValue: string;
  placeHolderNoRecipientsFound: ReactNode;
  placeHolderNoRecipientsExists: ReactNode;
}

export const RecipientsList = <T extends Recipient>({
  recipients,
  customRecipient,
  selectedRecipientsIds,
  selectRecipientAction,
  removeRecipientAction,
  recipientSubLinesFn,
  searchValue,
  placeHolderNoRecipientsFound,
  placeHolderNoRecipientsExists,
}: RecipientsListProps<T>) => {
  const dispatch = useAppDispatch();

  const recipientsToRender = useMemo(() => {
    return recipients.length > 0 ? recipients : customRecipient ? [customRecipient] : [];
  }, [customRecipient, recipients]);

  const hasRecipientsToRender = recipientsToRender.length > 0;
  const isEmptySearch = searchValue.length === 0;

  const onRecipientCardClicked = useCallback(
    (event: MouseEvent | undefined) => {
      if (!event) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const target = event?.target as HTMLElement;
      const dataSet = target?.closest<HTMLElement>('[data-contact-id]')?.dataset;

      if (dataSet) {
        const recipientId = dataSet.contactId;
        if (!recipientId) {
          return;
        }

        if (selectedRecipientsIds.includes(recipientId)) {
          dispatch(removeRecipientAction({ id: recipientId }));
        } else {
          const recipient = recipientsToRender.find(c => c.id === recipientId);
          if (recipient) {
            dispatch(selectRecipientAction(recipient));
          }
        }
      }
    },
    [
      selectedRecipientsIds,
      dispatch,
      removeRecipientAction,
      recipientsToRender,
      selectRecipientAction,
    ]
  );

  // Set/Remove custom recipient
  useEffect(() => {
    const isSearchValueValidEmail = isValidEmail(searchValue);
    const hasRecipients = recipients.length > 0;

    if (!hasRecipients && isSearchValueValidEmail && searchValue.trim().length > 0) {
      dispatch(
        setCustomRecipient({
          id: searchValue,
          email: searchValue,
          firstName: searchValue,
          lastName: '',
          companyName: searchValue,
        })
      );
    } else {
      dispatch(setCustomRecipient(undefined));
    }
  }, [searchValue, recipients, dispatch]);

  if (!hasRecipientsToRender) {
    return (
      <div className="w-full flex justify-center items-center h-[inherit]">
        {isEmptySearch ? placeHolderNoRecipientsExists : placeHolderNoRecipientsFound}
      </div>
    );
  }

  return (
    <div onClick={onRecipientCardClicked}>
      {recipientsToRender.map((recipient: Recipient) => (
        <a href="" key={recipient.id}>
          <AtlusContact
            recipient={recipient}
            isActive={selectedRecipientsIds.includes(recipient.id)}
            subLines={recipientSubLinesFn(recipient)}
            wrapperClassnames={atlusMediumModalBodyPx}
          />
        </a>
      ))}
    </div>
  );
};
