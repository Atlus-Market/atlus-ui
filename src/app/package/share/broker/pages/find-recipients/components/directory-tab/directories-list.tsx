'use client';

import { useAppSelector } from '@/redux/hooks';
import {
  Recipient,
  RecipientsList,
} from '@/app/package/share/broker/components/commom/recipients-list';
import { selectDirectories } from '@/redux/features/share-package/selectors/find-recipients/directories.selectors';
import { selectSelectedRecipientsId } from '@/redux/features/share-package/selectors/find-recipients.selectors';
import { addRecipient, removeRecipient } from '@/redux/features/share-package/share-package';

export const DirectoriesList = () => {
  const directories = useAppSelector(selectDirectories);
  const selectedContactsId = useAppSelector(selectSelectedRecipientsId);

  return (
    <RecipientsList
      selectedRecipientsIds={selectedContactsId}
      recipients={directories}
      selectRecipientAction={addRecipient}
      removeRecipientAction={removeRecipient}
      recipientSubLinesFn={(recipient: Recipient) => [recipient.companyName]}
    />
  );
};
