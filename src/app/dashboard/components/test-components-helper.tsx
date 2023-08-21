'use client';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/components/ui/notification/atlus-notification';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiOutlineClipboardCopy, HiOutlineDotsVertical } from 'react-icons/hi';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';

export const TestComponentsHelper = () => {
  return (
    <div>
      <button onClick={() => showSuccessNotification({ text: 'Success' })}>
        Show Success Notification
      </button>
      <button
        onClick={() => showErrorNotification({ text: 'Invalid session' })}
      >
        Show Error Notification
      </button>

      <div className='p-6'>
        <AtlusMenu
          menuButton={
            <AtlusButton
              variant='clear'>
              <HiOutlineDotsVertical />
            </AtlusButton>
          }
          menuItems={
            <>
              <AtlusMenuItem text='Cut' icon={HiOutlineClipboardCopy} />
              <AtlusMenuItem text='Copy' />
              <AtlusMenuItem text='Paste' />
            </>
          }
        />
      </div>
    </div>
  );
};
