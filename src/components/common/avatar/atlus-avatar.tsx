import { Size } from '@/components/components.types';
import clsx from 'clsx';
import { AvatarColorPicker } from '@/components/common/avatar/avatar-color';
import { HiUser } from 'react-icons/hi2';

interface AtlusAvatarProps {
  size?: Size;
  word?: string;
}

export const AtlusAvatar = ({ size = 'medium', word }: AtlusAvatarProps) => {
  const char = word?.at(0);
  const avatarColor = AvatarColorPicker.getColor(char);
  return (
    <div
      className={clsx(
        avatarColor.backgroundColor,
        'bg-light-grey rounded-[50%] inline-flex items-center justify-center flex-shrink-0',
        {
          'mt-[-2px]': !char,
          'w-[40px] h-[40px] md:w-16 md:h-16': size === 'big',
          'w-8 h-8': size === 'medium',
          'w-5 h-5 md:w-6 md:h-6': size === 'small',
        }
      )}
    >
      <span
        className={clsx(avatarColor.textColor, 'uppercase', {
          'text-[24px] md:text-[28px]': size === 'big',
          'text-[26px]': size === 'medium',
          'text-[12px] md:text-[20px]': size === 'small',
        })}
      >
        {char || <HiUser />}
      </span>
    </div>
  );
};
