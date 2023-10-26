'use client';

import { useLayoutEffect, useState } from 'react';
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
  40: 'w-[40px] h-[40px]',
};

const DefaultIconName = 'default_icon.svg';

const iconMap = new Map<string, StaticImageData>();

export const Icon = ({ name, size = 20, color = 'orange' }: IconProps) => {
  const [iconName, setIconName] = useState<string>(name);
  const [imageData, setImageData] = useState<StaticImageData | null>(null);

  if (!(iconName === name || iconName === DefaultIconName)) {
    setIconName(name);
  }

  useLayoutEffect((): (() => void) => {
    let mounted = true;
    const iconUrl = `@/public/assets/icons/${iconName}`;

    const importIcon = async (): Promise<void> => {
      try {
        const icon = (await import(`@/public/assets/icons/${iconName}`)).default;

        // If the component is unmounted while loading,
        // then don't update the state.
        if (mounted) {
          setImageData(icon);
          iconMap.set(iconUrl, icon);
        }
      } catch (err) {
        console.error(`Error loading icon "${iconName}"`);
        if (!mounted) {
          return;
        }
        setImageData(null);
        if (iconName !== DefaultIconName) {
          setIconName(DefaultIconName);
        }
      }
    };

    const iconData = iconMap.get(iconUrl);
    if (iconData) {
      setImageData(iconData);
    } else {
      importIcon();
    }

    return () => {
      mounted = false;
    };
  }, [iconName]);

  return (
    <div
      id={name}
      className={clsx('inline-flex items-center flex-shrink-0', iconContainerSize[size])}
    >
      {imageData ? (
        <Image priority={true} src={imageData} width={size} alt={name} />
      ) : (
        <div className={iconContainerSize[size]} />
      )}
    </div>
  );
};
