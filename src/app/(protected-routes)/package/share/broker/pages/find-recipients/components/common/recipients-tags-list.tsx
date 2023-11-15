import { Recipient } from '@/redux/features/share-package/slices/recipient';
import { SelectedRecipient } from '@/app/(protected-routes)/package/share/components/common/selectedRecipient';

interface RecipientsTagsListProps {
  recipients: Recipient[];
  onRemoveRecipient: (id: string) => void;
}

export const RecipientsTagsList = ({ recipients, onRemoveRecipient }: RecipientsTagsListProps) => {
  return (
    <>
      {recipients.map(recipient => (
        <SelectedRecipient
          recipient={recipient}
          onRemoveRecipient={onRemoveRecipient}
          key={recipient.id}
        />
      ))}
    </>
  );
};
