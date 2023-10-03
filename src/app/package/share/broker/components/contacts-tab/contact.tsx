import { Contact } from '@/models/contact';
import { HiUser } from 'react-icons/hi2';
import CircleSVG from '@/public/assets/images/circle.svg';
import Image from 'next/image';

interface ContactCardProps {
  contact: Contact;
}

export const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <div className="flex items-center py-3" data-contact-id={contact.id}>
      <div className="bg-light-grey rounded-[50%] inline-flex items-center justify-center w-16 h-16 mr-4">
        <HiUser size={64} color="#ffffff" />
      </div>
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
    </div>
  );
};
