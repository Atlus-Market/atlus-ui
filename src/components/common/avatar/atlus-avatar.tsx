'use client';
import { AvatarColorPicker } from '@/components/common/avatar/avatar-color';
import clsx from 'clsx';
import { HiUser } from 'react-icons/hi2';
import { useCallback, useLayoutEffect, useRef } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { UserAvatarSize } from '@/models/user-avatar-size';

interface AtlusAvatarProps {
  className?: string;
  avatarImageSize?: UserAvatarSize;
  data: {
    firstName?: string;
    avatar?: string;
  };
}

const defaultAvatarSize: UserAvatarSize = 'medium';

const getAvatarUrlForSize = (avatarUrl: string, size: UserAvatarSize): string => {
  if (size === defaultAvatarSize) {
    return avatarUrl;
  }

  return avatarUrl.replace(defaultAvatarSize, size);
};

export const AtlusAvatar = ({
  avatarImageSize = defaultAvatarSize,
  className,
  data,
}: AtlusAvatarProps) => {
  const { firstName, avatar: avatarUrl } = data;
  const char = firstName?.at(0);
  const avatarColor = AvatarColorPicker.getAvatarColor(char);
  const ref = useRef<HTMLDivElement | null>(null);

  const setFontVariable = useCallback(() => {
    const width = ref.current?.clientWidth || 36;
    ref.current?.style.setProperty('--avatar-font-size', `${width}px`);
  }, []);

  useLayoutEffect(() => {
    setFontVariable();
  }, [setFontVariable]);

  useResizeObserver(document.body, () => setFontVariable());

  return (
    <div
      ref={ref}
      className={clsx(
        { [avatarColor.backgroundColor]: !avatarUrl },
        "relative before:content-[''] before:block before:pt-[100%]",
        'rounded-[50%]',
        'flex-shrink-0',
        className
      )}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <div className="flex items-center justify-center h-full">
          {avatarUrl ? (
            <img
              className="w-[var(--avatar-font-size)] rounded-[50%]"
              src={getAvatarUrlForSize(avatarUrl, avatarImageSize)}
              alt="user profile image"
            />
          ) : (
            <span
              className={clsx(
                'uppercase leading-none mt-[1px]',
                avatarColor.textColor,
                'text-[calc(var(--avatar-font-size)_/_2.28)]'
              )}
            >
              {char || <HiUser />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
