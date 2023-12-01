'use cilent';

import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { ChangeLink } from '@/app/(main)/settings/components/change-link';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { useRef } from 'react';
import { useRemoveUserAvatar } from '@/hooks/data/use-remove-user-avatar';
import { FileSelector } from '@/components/ui/select-file/file-selector';

interface UserAvatarMenuProps {
  onSelectAvatarImage: (dataImageUrl: string) => void;
  userAvatar: string;
}

export const UserAvatarMenu = ({ onSelectAvatarImage, userAvatar }: UserAvatarMenuProps) => {
  const { isOn, setOn, setOff } = useToggleState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync, isLoading } = useRemoveUserAvatar();

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
      <FileSelector className="hidden" onFileSelected={onSelectAvatarImage} ref={inputRef} />
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
