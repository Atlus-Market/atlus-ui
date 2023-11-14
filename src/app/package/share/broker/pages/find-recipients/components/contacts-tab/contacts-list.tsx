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
import { isCustomRecipient, Recipient } from '@/redux/features/share-package/slices/recipient';
import { AtlusPlaceholderImage } from '@/components/common/atlus-placeholder-image';
import SearchContactSvgImage from '@/public/assets/images/search_contact.svg';

const recipientSubLines = (recipient: Recipient) => {
  if (isCustomRecipient(recipient)) {
    return [];
  }
  return [recipient.companyName, recipient.email];
};

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
      recipientSubLinesFn={recipientSubLines}
      searchValue={searchValue}
      placeHolderNoRecipientsExists={
        <AtlusPlaceholderImage
          image={SearchContactSvgImage}
          imageAltText="No contacts"
          bottomText="Enter the recipient’s email address to share your package"
        />
      }
      placeHolderNoRecipientsFound={
        <AtlusPlaceholderImage
          image={SearchContactSvgImage}
          imageAltText="No contacts found"
          bottomText="No results found"
        />
      }
    />
  );
};
