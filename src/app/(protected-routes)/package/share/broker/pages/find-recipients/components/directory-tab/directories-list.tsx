'use client';

import { useAppSelector } from '@/redux/hooks';
import { RecipientsList } from '@/app/(protected-routes)/package/share/broker/pages/find-recipients/components/common/recipients-list';
import {
  selectDirectories,
  selectDirectoriesSearchValue,
} from '@/redux/features/share-package/selectors/find-recipients/directories.selectors';
import {
  selectCustomRecipient,
  selectSelectedRecipientsId,
} from '@/redux/features/share-package/selectors/find-recipients.selectors';
import { addRecipient, removeRecipient } from '@/redux/features/share-package/share-package';
import { isCustomRecipient, Recipient } from '@/redux/features/share-package/slices/recipient';
import { AtlusPlaceholderImage } from '@/components/common/atlus-placeholder-image';
import SearchSvgImage from '@/public/assets/images/search.svg';

const recipientsSubLines = (recipient: Recipient) => {
  if (isCustomRecipient(recipient)) {
    return [];
  }
  return [recipient.companyName];
};

export const DirectoriesList = () => {
  const directories = useAppSelector(selectDirectories);
  const selectedContactsId = useAppSelector(selectSelectedRecipientsId);
  const searchValue = useAppSelector(selectDirectoriesSearchValue);
  const customRecipient = useAppSelector(selectCustomRecipient);

  return (
    <RecipientsList
      selectedRecipientsIds={selectedContactsId}
      recipients={directories}
      customRecipient={customRecipient}
      selectRecipientAction={addRecipient}
      removeRecipientAction={removeRecipient}
      recipientSubLinesFn={recipientsSubLines}
      searchValue={searchValue}
      placeHolderNoRecipientsExists={
        <AtlusPlaceholderImage
          image={SearchSvgImage}
          imageAltText="No contacts"
          bottomText="Find someone on Atlus by typing in their name or company"
        />
      }
      placeHolderNoRecipientsFound={
        <AtlusPlaceholderImage
          image={SearchSvgImage}
          imageAltText="No results found"
          bottomText="No results found"
        />
      }
    />
  );
};
