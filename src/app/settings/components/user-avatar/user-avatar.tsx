import { User } from '@/models/user';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { UserAvatarMenu } from '@/app/settings/components/user-avatar/user-avatar-menu';
import { AtlusImageCropperModal } from '@/components/common/image-cropper/atlus-image-cropper-modal';
import { useToggleState } from '@/hooks/use-toggle-state';

interface UserAvatarProps {
  user: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  const { isOn: isImageCropperModalOpen, setOff, setOn } = useToggleState();
  return (
    <div className="flex items-center justify-center flex-col mb-6 md:mb-8">
      <AtlusAvatar word={user.firstName} className="w-[125px] mb-3" />
      <div>
        <UserAvatarMenu onChangeAvatar={setOn} />
        <AtlusImageCropperModal isOpen={isImageCropperModalOpen} onClose={setOff} />
      </div>
    </div>
  );
};
