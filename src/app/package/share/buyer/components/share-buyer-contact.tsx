import { Recipient } from '@/redux/features/share-package/slices/recipient';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';

interface ShareBuyerContactProps {
  recipient: Recipient;
}

export const ShareBuyerContact = ({ recipient }: ShareBuyerContactProps) => {
  const { firstName, lastName, email } = recipient;
  let displayName = email;
  if (firstName && lastName) {
    displayName = `${firstName} ${lastName}`;
  }

  return (
    <div className="flex items-center gap-2">
      <AtlusAvatar word={displayName} className="w-32" />
      <span className="text-sm font-medium text-soft-black font-inter">{displayName}</span>
    </div>
  );
};
