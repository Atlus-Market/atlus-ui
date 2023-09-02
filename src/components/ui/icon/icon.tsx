'use client';

import { useEffect, useState } from 'react';
import { AtlusColor } from '@/components/ui/theme';
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

export type IconSize = 20 | 22 | 40;

interface IconProps {
  name: string;
  color?: AtlusColor;
  size?: IconSize;
}

const iconContainerSize: Readonly<Record<IconSize, string>> = {
  20: 'w-[20px] h-[20px]',
  22: 'w-[22px] h-[22px]',
  40: 'w-[40px] h-[40px]'
};

const DefaultIconName = 'default_icon.svg';

export const Icon = ({ name, size = 20, color = 'orange' }: IconProps) => {
  const [iconName, setIconName] = useState<string>(name);
  const [imageData, setImageData] = useState<StaticImageData | null>(null);

  useEffect(() => {
    if (iconName === name || iconName === DefaultIconName) {
      return;
    }
    setIconName(name);
  }, [name, iconName]);

  useEffect((): (() => void) => {
    let mounted = true;

    const importIcon = async (): Promise<void> => {
      try {
        const icon = (await import(`@/public/assets/icons/${iconName}`)).default;

        // If the component is unmounted while loading,
        // then don't update the state.
        if (mounted) {
          setImageData(icon);
        }
      } catch (err) {
        setImageData(null);
        console.error(`Error loading icon "${iconName}"`);
        if (iconName !== DefaultIconName) {
          setIconName(DefaultIconName);
        }
      }
    };

    importIcon();

    return () => {
      mounted = false;
    };
  }, [iconName]);

  return (
    <div
      id={name}
      className={clsx(
        'inline-flex items-center flex-shrink-0',
        iconContainerSize[size]
      )}
    >
      {imageData ? (
        <Image priority={true} src={imageData} width={size} alt={name} />
      ) : (
        <div className={iconContainerSize[size]} />
      )}
    </div>
  );
};
