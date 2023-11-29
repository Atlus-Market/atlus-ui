'use cilent';

import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { ChangeLink } from '@/app/settings/components/change-link';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { ChangeEvent, useRef } from 'react';
import { useRemoveUserAvatar } from '@/hooks/data/use-remove-user-avatar';

interface UserAvatarMenuProps {
  onSelectAvatarImage: (dataImageUrl: string) => void;
  userAvatar: string;
}

export const UserAvatarMenu = ({ onSelectAvatarImage, userAvatar }: UserAvatarMenuProps) => {
  const { isOn, setOn, setOff } = useToggleState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync, isLoading } = useRemoveUserAvatar();

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener(
        'load',
        () => {
          onSelectAvatarImage(reader.result as string);
          if (inputRef.current) {
            // Clear the input so same image can be reselected
            inputRef.current.value = '';
          }
        },
        { once: true }
      );
    }
  };

  return (
    <>
      <AtlusAlertModal
        isOpen={isOn}
        title="Remove avatar?"
        text="Your avatar will no longer be visible."
        mainButton={{
          text: 'Remove',
          isLoading,
          onClick: async () => {
            await mutateAsync();
            setOff();
          },
        }}
        secondaryButton={{
          text: 'Cancel',
          onClick: setOff,
          disabled: isLoading,
        }}
      />
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onSelectFile}
        className="hidden"
      />
      <AtlusMenu
        menuButton={
          <button
            type="button"
            onClick={e => {
              // Stop propagation up so navigation to view package
              // is not triggered.
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <ChangeLink changePartText="avatar" />
          </button>
        }
        menuItems={
          <>
            <AtlusMenuItem
              text="Upload new avatar"
              onClick={() => {
                inputRef.current?.click();
              }}
            />
            {userAvatar && <AtlusMenuItem text="Remove" onClick={setOn} />}
          </>
        }
      />
    </>
  );
};
