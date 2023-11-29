'use client';

import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { AtlusMenuItem } from '@/components/ui/menu/atlus-menu-item';
import { AtlusMenuDivider } from '@/components/ui/menu/atlus-menu-divider';
import { AtlusMenu } from '@/components/ui/menu/atlus-menu';
import { DashboardRoute, LogoutRoute, SettingsRoute } from '@/constants/routes';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';
import { useHasAtlusSession } from '@/app/(auth)/session/use-has-atlus-session';
import Link from 'next/link';

interface UserHeaderMenuProps {}

export const UserHeaderMenu = ({}: UserHeaderMenuProps) => {
  const { data: user } = useAtlusUser();
  const hasAtlusSession = useHasAtlusSession();

  if (!hasAtlusSession || !user) {
    return null;
  }

  return (
    <AtlusMenu
      menuButton={
        <button>
          <AtlusAvatar data={user} className="w-32 md:w-40" />
        </button>
      }
      menuItems={
        <>
          <Link href={DashboardRoute}>
            <AtlusMenuItem text={'Dashboard'} />
          </Link>
          <Link href={SettingsRoute}>
            <AtlusMenuItem text={'Settings'} />
          </Link>
          <AtlusMenuDivider />
          <Link href={LogoutRoute}>
            <AtlusMenuItem text={'Log out'} />
          </Link>
        </>
      }
    />
  );
};
