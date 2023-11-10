'use client';
import { AvatarColorPicker } from '@/components/common/avatar/avatar-color';
import clsx from 'clsx';
import { HiUser } from 'react-icons/hi2';
import { useCallback, useLayoutEffect, useRef } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

interface AtlusAvatarProps {
  word?: string;
  className?: string;
}

export const AtlusAvatar = ({ word, className }: AtlusAvatarProps) => {
  const char = word?.at(0);
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
        avatarColor.backgroundColor,
        "relative before:content-[''] before:block before:pt-[100%]",
        'rounded-[50%]',
        'flex-shrink-0',
        className
      )}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <div className="flex items-center justify-center h-full">
          <span
            className={clsx(
              'uppercase leading-none mt-[1px]',
              avatarColor.textColor,
              'text-[calc(var(--avatar-font-size)_/_2.28)]'
            )}
          >
            {char || <HiUser />}
          </span>
        </div>
      </div>
    </div>
  );
};
