'use client';

import { useAppSelector } from '@/redux/hooks';
import {
  selectContacts,
  selectContactsSearchValue,
} from '@/redux/features/share-package/selectors/find-recipients/contacts.selectors';
import { RecipientsList } from '@/app/package/share/broker/pages/find-recipients/components/common/recipients-list';
import {
  selectCustomRecipient,
  selectSelectedRecipientsId,
} from '@/redux/features/share-package/selectors/find-recipients.selectors';
import { addRecipient, removeRecipient } from '@/redux/features/share-package/share-package';
import { Recipient } from '@/redux/features/share-package/slices/find-recipients/recipient';

export const ContactsList = () => {
  const contacts = useAppSelector(selectContacts);
  const selectedContactsId = useAppSelector(selectSelectedRecipientsId);
  const searchValue = useAppSelector(selectContactsSearchValue);
  const customRecipient = useAppSelector(selectCustomRecipient);

  return (
    <RecipientsList
      selectedRecipientsIds={selectedContactsId}
      recipients={contacts}
      customRecipient={customRecipient}
      selectRecipientAction={addRecipient}
      removeRecipientAction={removeRecipient}
      recipientSubLinesFn={(recipient: Recipient) => [recipient.companyName, recipient.email]}
      searchValue={searchValue}
    />
  );
};
