'use client';

import { User } from '@/models/user';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusMenuDivider } from '@/components/ui/menu/atlus-menu-divider';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { useLogout } from '@/app/(auth)/session/use-logout';
import { useRouter } from 'next/navigation';
import { DashboardRoute } from '@/constants/routes';

interface UserHeaderMenuProps {
  user: User | undefined;
}

export const UserHeaderMenu = ({ user }: UserHeaderMenuProps) => {
  const logout = useLogout();
  const router = useRouter();

  if (!user) {
    return null;
  }
  return (
    <AtlusMenu
      menuButton={
        <button>
          <AtlusAvatar word={user.fullName} />
        </button>
      }
      menuItems={
        <>
          <AtlusMenuItem text={'Dashboard'} onClick={() => router.push(DashboardRoute)} />
          <AtlusMenuItem text={'Settings'} />
          <AtlusMenuDivider />
          <AtlusMenuItem text={'Log out'} onClick={logout} />
        </>
      }
    />
  );
};
