'use client';

import { useAppSelector } from '@/redux/hooks';
import { removeSelectedContact, selectContact } from '@/redux/features/share-package/share-package';
import {
  selectContacts,
  selectSelectedContactsIds,
} from '@/redux/features/share-package/selectors/find-recipients/contacts.selectors';
import { Recipient, RecipientsList } from '@/app/package/share/broker/components/recipients-list';

export const ContactsList = () => {
  const contacts = useAppSelector(selectContacts);
  const selectedContactsId = useAppSelector(selectSelectedContactsIds);

  return (
    <RecipientsList
      selectedRecipientsIds={selectedContactsId}
      recipients={contacts}
      selectRecipientAction={selectContact}
      removeRecipientAction={removeSelectedContact}
      recipientSubLinesFn={(recipient: Recipient) => [recipient.companyName, recipient.email]}
    />
  );
};
