'use client';

import { useAppDispatch } from '@/redux/hooks';
import { MouseEvent, useCallback } from 'react';
import { Action } from 'redux';
import { AtlusContact } from '@/components/common/atlus-contact';

export type Recipient = {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
};

interface RecipientsListProps<T extends Recipient> {
  selectRecipientAction: (recipient: T) => Action;
  removeRecipientAction: (payload: { id: string }) => Action;
  recipients: T[];
  selectedRecipientsIds: string[];
  recipientSubLinesFn: (recipient: Recipient) => string[];
}

export const RecipientsList = <T extends Recipient>({
  recipients,
  selectedRecipientsIds,
  selectRecipientAction,
  removeRecipientAction,
  recipientSubLinesFn,
}: RecipientsListProps<T>) => {
  const dispatch = useAppDispatch();

  const onRecipientCardClicked = useCallback(
    (event: MouseEvent | undefined) => {
      if (!event) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const target = event?.target as HTMLElement;
      const dataSet = target?.closest<HTMLElement>('[data-contact-id]')?.dataset;
      console.log('contact card dataSet: ', dataSet);

      if (dataSet) {
        const recipientId = dataSet.contactId;
        console.log('recipientId: ', recipientId);
        if (!recipientId) {
          return;
        }

        if (selectedRecipientsIds.includes(recipientId)) {
          dispatch(removeRecipientAction({ id: recipientId }));
        } else {
          const recipient = recipients.find(c => c.id === recipientId);
          if (recipient) {
            dispatch(selectRecipientAction(recipient));
          }
        }
      }
    },
    [selectedRecipientsIds, dispatch, removeRecipientAction, recipients, selectRecipientAction]
  );

  return (
    <div onClick={onRecipientCardClicked}>
      {recipients.map((recipient: Recipient) => (
        <a href="" key={recipient.id}>
          <AtlusContact
            size="big"
            recipient={recipient}
            isActive={selectedRecipientsIds.includes(recipient.id)}
            subLines={recipientSubLinesFn(recipient)}
          />
        </a>
      ))}
    </div>
  );
};
