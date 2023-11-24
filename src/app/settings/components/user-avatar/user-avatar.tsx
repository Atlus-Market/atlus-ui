import { User } from '@/models/user';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { UserAvatarMenu } from '@/app/settings/components/user-avatar/user-avatar-menu';

interface UserAvatarProps {
  user: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <div className="flex items-center justify-center flex-col mb-6 md:mb-8">
      <AtlusAvatar word={user.firstName} className="w-[125px] mb-3" />

      <div>
        <UserAvatarMenu />
      </div>
    </div>
  );
};
