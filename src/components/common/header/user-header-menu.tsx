'use client';

import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusMenuDivider } from '@/components/ui/menu/atlus-menu-divider';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { useLogout } from '@/app/(auth)/session/use-logout';
import { useRouter } from 'next/navigation';
import { DashboardRoute } from '@/constants/routes';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';
import { useHasAtlusSession } from '@/app/(auth)/session/use-has-atlus-session';

interface UserHeaderMenuProps {}

export const UserHeaderMenu = ({}: UserHeaderMenuProps) => {
  const { data: user } = useAtlusUser();
  const hasAtlusSession = useHasAtlusSession();
  const logout = useLogout();
  const router = useRouter();

  if (!hasAtlusSession) {
    return null;
  }

  return (
    <AtlusMenu
      menuButton={
        <button>
          <AtlusAvatar word={user?.fullName} />
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
