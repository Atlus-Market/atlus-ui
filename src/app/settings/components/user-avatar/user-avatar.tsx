import { User } from '@/models/user';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { UserAvatarMenu } from '@/app/settings/components/user-avatar/user-avatar-menu';
import { AtlusImageCropperModal } from '@/components/common/image-cropper/atlus-image-cropper-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { useCallback, useState } from 'react';

interface UserAvatarProps {
  user: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  const { isOn: isImageCropperModalOpen, setOff, setOn } = useToggleState();
  const [image, setImage] = useState<string | null>(null);

  const onAvatarImageSelected = useCallback(
    (dataImageUrl: string) => {
      console.log('Image: ', dataImageUrl);
      setImage(dataImageUrl);
      setOn();
    },
    [setOn]
  );

  const closeImageCropper = useCallback(() => {
    setImage(null);
    setOff();
  }, [setOff]);

  return (
    <div className="flex items-center justify-center flex-col mb-6 md:mb-8">
      <AtlusAvatar word={user.firstName} className="w-[125px] mb-3" />
      <div>
        <UserAvatarMenu onSelectAvatarImage={onAvatarImageSelected} />
        {image && (
          <AtlusImageCropperModal
            isOpen={isImageCropperModalOpen}
            onClose={closeImageCropper}
            imageDataUrl={image}
          />
        )}
      </div>
    </div>
  );
};
