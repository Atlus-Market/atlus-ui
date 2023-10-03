import { Contact } from '@/models/contact';
import { HiCheckCircle, HiUser } from 'react-icons/hi2';
import CircleSVG from '@/public/assets/images/circle.svg';
import Image from 'next/image';
import clsx from 'clsx';

interface ContactCardProps {
  contact: Contact;
  isActive?: boolean;
}

export const ContactCard = ({ contact, isActive }: ContactCardProps) => {
  return (
    <div
      className={clsx('flex items-center py-3', {
        'bg-off-white': isActive,
      })}
      data-contact-id={contact.id}
    >
      <div className="bg-light-grey rounded-[50%] inline-flex items-center justify-center w-16 h-16 mr-4">
        <HiUser size={64} color="#ffffff" />
      </div>
      <div className="flex justify-between items-center w-full">
        <div>
          <div className="text-base text-black mb-1 leading-5">
            {contact.firstName} {contact.lastName}
          </div>
          <div className="text-sm text-dark-grey leading-[17px]">
            {contact.companyName}
            <Image src={CircleSVG} alt="circle" className="inline-block mx-[11px]" />
            {contact.email}
          </div>
        </div>
        {isActive && <HiCheckCircle className="text-orange" size={20} />}
      </div>
    </div>
  );
};
