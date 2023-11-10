import { Contact } from '@/models/contact';
import { AtlusAvatar } from '@/components/common/avatar/atlus-avatar';
import { AtlusCircle } from '@/components/ui/atlus-circle';

interface ContactOptionProps {
  contact: Contact;
}

export const ContactOption = ({ contact }: ContactOptionProps) => {
  return (
    <div className="flex items-center gap-2">
      <AtlusAvatar className="w-32" word={contact.firstName} />
      <span className="leading-normal text-sm font-inter font-medium">
        {contact.firstName} {''} {contact.lastName}
      </span>
      <AtlusCircle className="bg-light-grey" width={4} height={4} />
      <span className="text-sm font-inter text-dark-grey leading-normal font-normal">
        {contact.companyName}
      </span>
    </div>
  );
};
