'use cilent';

import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { ChangeLink } from '@/app/settings/components/change-link';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useToggleState } from '@/hooks/use-toggle-state';
import { ChangeEvent, useRef } from 'react';

interface UserAvatarMenuProps {
  onSelectAvatarImage: (dataImageUrl: string) => void;
}

export const UserAvatarMenu = ({ onSelectAvatarImage }: UserAvatarMenuProps) => {
  const { isOn, setOn, setOff } = useToggleState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener(
        'load',
        () => {
          onSelectAvatarImage(reader.result as string);
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
          onClick: () => {
            setOff();
          },
        }}
        secondaryButton={{
          text: 'Cancel',
          onClick: setOff,
        }}
      />
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onSelectFile}
        style={{ display: 'none' }}
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
            <AtlusMenuItem
              text="Upload new avatar"
              onClick={() => {
                inputRef.current?.click();
              }}
            />
            <AtlusMenuItem text="Remove" onClick={setOn} />
          </>
        }
      />
    </>
  );
};
