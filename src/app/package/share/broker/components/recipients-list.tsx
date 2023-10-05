'use client';

import { useAppDispatch } from '@/redux/hooks';
import { MouseEvent, useCallback } from 'react';
import { ContactCard } from '@/app/package/share/broker/components/contacts-tab/contact';
import { Action } from 'redux';

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
}

export const RecipientsList = <T extends Recipient>({
  recipients,
  selectedRecipientsIds,
  selectRecipientAction,
  removeRecipientAction,
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
          <ContactCard
            recipient={recipient}
            isActive={selectedRecipientsIds.includes(recipient.id)}
          />
        </a>
      ))}
    </div>
  );
};
