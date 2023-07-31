import { Contact } from '@/models/contact';
import { AtlusInput } from '@/components/ui/input/atlus-input';

interface ActiveContactProps {
  contact: Contact;
}

export const ActiveContact = ({ contact }: ActiveContactProps) => {
  return (
    <div>
      <AtlusInput
        label='Company'
        value={contact.companyName}
        disabled={true}
      />
      <AtlusInput
        label='Email'
        value={contact.email}
        disabled={true}
      />
      <AtlusInput
        label='Phone number'
        value={contact.phoneNumber}
        disabled={true}
      />
    </div>
  );
};
