import { User } from '@/models/user';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { AtlusDivider } from '@/components/ui/divider/atlus-divider';
import { HiGlobeAlt, HiPhone } from 'react-icons/hi2';
import { HiMail } from 'react-icons/hi';
import Link from 'next/link';
import { AtlusButton } from '@/components/ui/button/atlus-button';

interface UserProfileBodyProps {
  user: User;
}

const iconClassnames = 'text-xl md:text-2xl text-dark-grey';

export const UserProfileBody = ({ user }: UserProfileBodyProps) => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <AtlusAvatar word={user.fullName} size="big" className="mb-6" />
        <div className="mb-2 text-xl md:text-2xl text-soft-black">{user.fullName}</div>
        <div className="text-cm md:text-base text-dark-grey">{user.companyName}</div>
      </div>

      <AtlusDivider className="mt-8 md:mt-10 mb-6" />

      <div className="text-dark-grey text-[13px] md:text-sm leading-5 mb-6">Contact info</div>

      <div className="flex items-center gap-[18px] mb-6">
        <HiPhone className={iconClassnames} />
        <span className="text-black text-sm md:text-base">
          {user.businessPhone || user.cellPhone || 'None'}
        </span>
      </div>

      <div className="flex items-center gap-[18px] mb-6">
        <HiMail className={iconClassnames} />
        <Link href={`mailto:${user.email}`} target="_blank">
          <span className="text-orange text-sm md:text-base">{user.email}</span>
        </Link>
      </div>

      <div className="flex items-center gap-[18px]">
        <HiGlobeAlt className={iconClassnames} />
        {(user.externalUrl && (
          <Link href={user.externalUrl || ''} target="_blank">
            <span className="text-orange text-sm md:text-base">{user.externalUrl}</span>
          </Link>
        )) || <span className="text-black text-sm md:text-base">None</span>}
      </div>

      <div className="w-full text-center mt-6 md:mt-12 mb-[14px] md:mb-2">
        <AtlusButton variant="outline">View Profile</AtlusButton>
      </div>
    </div>
  );
};
