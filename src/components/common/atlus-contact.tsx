import { HiCheckCircle } from 'react-icons/hi2';
import CircleSVG from '@/public/assets/images/circle.svg';
import Image from 'next/image';
import clsx from 'clsx';
import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';
import { Fragment } from 'react';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { Recipient } from '@/redux/features/share-package/slices/recipient';

interface ContactCardProps {
  recipient: Recipient;
  isActive?: boolean;
  subLines?: string[];
  wrapperClassnames?: string;
}

const subLinesClasses = 'text-dark-grey leading-17 text-xs md:text-sm';

export const AtlusContact = ({
  recipient,
  isActive,
  subLines = [],
  wrapperClassnames,
}: ContactCardProps) => {
  return (
    <div
      className={clsx(
        'flex items-center py-3',
        atlusModalBodyPaddingX,
        wrapperClassnames,
        'gap-2 md:gap-4',
        {
          'bg-off-white': isActive,
        }
      )}
      data-contact-id={recipient.id}
    >
      <AtlusAvatar className="w-40 md:w-64" data={recipient} />
      <div className="flex justify-between items-center w-full">
        <div>
          <div className="text-black leading-5 text-13 md:text-base">
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
