import { Contact } from '@/models/contact';
import { HiUser } from 'react-icons/hi2';
import Image from 'next/image';
import CircleSVG from '@/public/assets/images/circle.svg';

interface AtlusContactProps {
  contact: Contact;
}

export const AtlusContact = ({ contact }: AtlusContactProps) => {
  return (
    <div className="flex items-center">
      <div className="bg-light-grey rounded-[50%] inline-flex items-center justify-center w-8 h-8 mr-2">
        <HiUser size={20} color="#ffffff" />
      </div>
      <span className="text-soft-black text-sm font-medium">
        {contact.firstName} {contact.lastName}
      </span>
      <Image src={CircleSVG} alt="circle" className="inline-block mx-[11px]" />
      <span className="text-sm text-dark-grey font-normal">{contact.companyName}</span>
    </div>
  );
};
