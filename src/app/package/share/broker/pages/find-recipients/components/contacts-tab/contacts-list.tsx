'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectContacts } from '@/redux/features/share-package/selectors/find-recipients/contacts.selectors';
import {
  Recipient,
  RecipientsList,
} from '@/app/package/share/broker/pages/find-recipients/components/common/recipients-list';
import { selectSelectedRecipientsId } from '@/redux/features/share-package/selectors/find-recipients.selectors';
import { addRecipient, removeRecipient } from '@/redux/features/share-package/share-package';

export const ContactsList = () => {
  const contacts = useAppSelector(selectContacts);
  const selectedContactsId = useAppSelector(selectSelectedRecipientsId);

  return (
    <RecipientsList
      selectedRecipientsIds={selectedContactsId}
      recipients={contacts}
      selectRecipientAction={addRecipient}
      removeRecipientAction={removeRecipient}
      recipientSubLinesFn={(recipient: Recipient) => [recipient.companyName, recipient.email]}
    />
  );
};
