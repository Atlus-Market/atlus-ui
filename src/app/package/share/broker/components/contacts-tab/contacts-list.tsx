'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ContactCard } from '@/app/package/share/broker/components/contacts-tab/contact';
import { selectContact } from '@/redux/features/share-package/share-package';
import { selectContacts } from '@/redux/features/share-package/selectors/find-recipients/contacts.selectors';

export const ContactsList = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);

  return (
    <div
      onClick={e => {
        console.log(e);
        e?.preventDefault();
        e?.stopPropagation();
        const target = e?.target as HTMLElement;
        const dataSet = target?.closest<HTMLElement>('[data-contact-id]')?.dataset;
        console.log('dataSet: ', dataSet);
        if (dataSet) {
          const contactId = dataSet.contactId;
          console.log('contactId: ', contactId);
          const contact = contacts.find(c => c.id === contactId);
          if (contact) {
            dispatch(selectContact(contact));
          }
        }
      }}
    >
      {contacts.map(contact => (
        <a href="" key={contact.id}>
          <ContactCard contact={contact} />
        </a>
      ))}
    </div>
  );
};
