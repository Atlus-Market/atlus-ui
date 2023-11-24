'use cilent';

import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { ChangeLink } from '@/app/settings/components/change-link';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useToggleState } from '@/hooks/use-toggle-state';

interface UserAvatarMenuProps {
  onChangeAvatar: () => void;
}

export const UserAvatarMenu = ({ onChangeAvatar }: UserAvatarMenuProps) => {
  const { isOn, setOn, setOff } = useToggleState(false);
  return (
    <>
      <AtlusAlertModal
        isOpen={isOn}
        title="Remove avatar?"
        text="Your avatar will no longer be visible."
        mainButton={{
          text: 'Remove',
          onClick: () => {
            setOff();
          },
        }}
        secondaryButton={{
          text: 'Cancel',
          onClick: setOff,
        }}
      />
      <AtlusMenu
        menuButton={
          <button
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
            <AtlusMenuItem text="Upload new avatar" onClick={onChangeAvatar} />
            <AtlusMenuItem text="Remove" onClick={setOn} />
          </>
        }
      />
    </>
  );
};
