import { Size } from '@/components/components.types';
import { HiUser } from 'react-icons/hi2';
import clsx from 'clsx';

interface AtlusAvatarProps {
  size?: Size;
}

export const AtlusAvatar = ({ size = 'medium' }: AtlusAvatarProps) => {
  return (
    <div
      className={clsx(
        'bg-light-grey rounded-[50%] inline-flex items-center justify-center flex-shrink-0',
        'mt-[-2px]',
        {
          'w-[40px] h-[40px] md:w-16 md:h-16': size === 'big',
          'w-8 h-8': size === 'medium',
          'w-5 h-5 md:w-6 md:h-6': size === 'small',
        }
      )}
    >
      <HiUser
        color="#ffffff"
        className={clsx({
          'text-[40px] md:text-[64px]': size === 'big',
          'text-[32px]': size === 'medium',
          'text-[20px] md:text-[24px]': size === 'small',
        })}
      />
    </div>
  );
};
