import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { Recipient } from '@/redux/features/share-package/slices/find-recipients/recipient';

interface RecipientsTagsListProps {
  recipients: Recipient[];
  onRemoveRecipient: (id: string) => void;
}

export const RecipientsTagsList = ({ recipients, onRemoveRecipient }: RecipientsTagsListProps) => {
  return (
    <>
      {recipients.map(recipient => (
        <AtlusTag
          key={recipient.id}
          text={
            <div className="flex items-center gap-2">
              <AtlusAvatar className="w-20 md:w-24 " word={recipient.firstName} />
              {recipient.firstName} {recipient.lastName}
            </div>
          }
          size="small"
          onClose={() => onRemoveRecipient(recipient.id)}
        />
      ))}
    </>
  );
};
