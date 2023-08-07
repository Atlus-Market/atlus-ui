import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface UserTypeCardProps {
  image?: StaticImageData;
  icon?: ReactNode;
  title: string;
  description: string;
  isActive?: boolean;
  size?: 'small' | 'big';
}

const activeState = 'bg-off-white border-orange';
const inactiveState = 'border-light-grey';

export const AtlusImageCard = ({
  image,
  icon,
  title,
  description,
  isActive = false,
  size = 'big',
}: UserTypeCardProps) => {
  return (
    <div
      className={clsx(
        'border rounded-xl flex-shrink-0 cursor-pointer select-none',
        'flex flex-col justify-center items-center',
        'min-w-[250px] md:min-w-[331px]',
        size === 'big'
          ? 'min-h-[285px] md:min-h-[401px]'
          : 'min-h-[140px] md:min-h-[186px]',
        isActive ? activeState : inactiveState
      )}
    >
      {image && (
        <Image
          src={image}
          priority
          alt={title}
          className="mx-auto mb-4 md:mb-5 w-[150px] md:w-[199px] h-[150px] md:h-[199px]"
        />
      )}
      {icon && <div className="mb-3 md:mb-4 flex justify-center">{icon}</div>}
      <div className="text-center">
        <h3 className="text-base md:text-xl font-semibold mb-[6px] md:mb-2">
          {title}
        </h3>
        <h4 className="text-xs md:text-base font-normal">{description}</h4>
      </div>
    </div>
  );
};
