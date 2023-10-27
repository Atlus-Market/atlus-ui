import { HiCheckCircle } from 'react-icons/hi2';
import CircleSVG from '@/public/assets/images/circle.svg';
import Image from 'next/image';
import clsx from 'clsx';
import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';
import { Size } from '@/components/components.types';
import { Fragment } from 'react';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { Recipient } from '@/redux/features/share-package/slices/find-recipients/recipient';

interface ContactCardProps {
  size?: Size;
  recipient: Recipient;
  isActive?: boolean;
  subLines?: string[];
  wrapperClassnames?: string;
}

const subLinesClasses = 'text-dark-grey leading-17 text-xs md:text-sm';

export const AtlusContact = ({
  recipient,
  isActive,
  size = 'medium',
  subLines = [],
  wrapperClassnames,
}: ContactCardProps) => {
  const isBigSize = size === 'big';
  const isMediumSize = size === 'medium';
  const isSmallSize = size === 'small';
  return (
    <div
      className={clsx('flex items-center py-3', atlusModalBodyPaddingX, wrapperClassnames, {
        'bg-off-white': isActive,
        'gap-4': isBigSize || isMediumSize,
        'gap-2': isSmallSize,
      })}
      data-contact-id={recipient.id}
    >
      <AtlusAvatar size={size} word={recipient.firstName} />
      <div className="flex justify-between items-center w-full">
        <div>
          <div
            className={clsx('text-black leading-5', {
              'text-13 md:text-base': isBigSize,
              'text-13 md:text-sm': isMediumSize || isSmallSize,
            })}
          >
            {recipient.firstName} {recipient.lastName}
          </div>
          <div className={clsx('sm:hidden md:flex md:flex-row', subLinesClasses)}>
            {subLines?.map((text, index) => {
              const isLastItem = index === subLines?.length - 1;
              return (
                <Fragment key={`${index}-${text}`}>
                  <span>{text}</span>
                  {!isLastItem && (
                    <Image src={CircleSVG} alt="circle" className="inline-block mx-[11px]" />
                  )}
                </Fragment>
              );
            })}
          </div>
          <div className={clsx('md:hidden', subLinesClasses)}>
            {subLines?.map((text, index) => (
              <span key={`${index}-${text}`} className="block">
                {text}
              </span>
            ))}
          </div>
        </div>
        {isActive && <HiCheckCircle className="text-orange" size={20} />}
      </div>
    </div>
  );
};
