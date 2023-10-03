'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectContacts } from '@/redux/features/share-package/selectors/find-recipients.selectors';
import { ContactCard } from '@/app/package/share/broker/components/contacts-tab/contact';

export const ContactsList = () => {
  const contacts = useAppSelector(selectContacts);

  return (
    <div>
      {contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};
