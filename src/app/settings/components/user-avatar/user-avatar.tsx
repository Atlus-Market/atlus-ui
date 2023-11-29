import { User } from '@/models/user';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { UserAvatarMenu } from '@/app/settings/components/user-avatar/user-avatar-menu';
import { AtlusImageCropperModal } from '@/components/common/image-cropper/atlus-image-cropper-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { useCallback, useEffect, useState } from 'react';
import { DataImageURL } from '@/types';
import { useUploadUserAvatar } from '@/hooks/data/use-upload-user-avatar';

interface UserAvatarProps {
  user: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  const {
    isOn: isImageCropperModalOpen,
    setOff: closeImageCropperModal,
    setOn: showImageCropperModal,
  } = useToggleState();
  const [dataImageURL, setDataImageURL] = useState<DataImageURL | null>(null);

  const { mutate, isLoading, isSuccess } = useUploadUserAvatar();

  const onAvatarImageSelected = useCallback(
    (dataImageUrl: string) => {
      setDataImageURL(dataImageUrl);
      showImageCropperModal();
    },
    [showImageCropperModal]
  );

  const closeImageCropper = useCallback(() => {
    closeImageCropperModal();
    setDataImageURL(null);
  }, [closeImageCropperModal]);

  useEffect(() => {
    if (isSuccess) {
      closeImageCropper();
    }
  }, [closeImageCropper, isSuccess]);

  return (
    <div className="flex items-center justify-center flex-col mb-6 md:mb-8">
      <AtlusAvatar data={user} avatarImageSize="large" className="w-[125px] mb-3" />
      <div>
        <UserAvatarMenu onSelectAvatarImage={onAvatarImageSelected} userAvatar={user.avatar} />
        {dataImageURL && (
          <AtlusImageCropperModal
            isOpen={isImageCropperModalOpen}
            onClose={closeImageCropper}
            dataImageURL={dataImageURL}
            onImageCropped={(avatarFile: File) => {
              console.log('Avatar File: ', avatarFile);
              mutate(avatarFile);
            }}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};
