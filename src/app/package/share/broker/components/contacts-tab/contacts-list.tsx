'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ContactCard } from '@/app/package/share/broker/components/contacts-tab/contact';
import { removeSelectedContact, selectContact } from '@/redux/features/share-package/share-package';
import {
  selectContacts,
  selectSelectedContactsIds,
} from '@/redux/features/share-package/selectors/find-recipients/contacts.selectors';
import { MouseEvent, useCallback } from 'react';

export const ContactsList = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const selectedContactsId = useAppSelector(selectSelectedContactsIds);

  const onContactCardClicked = useCallback(
    (event: MouseEvent | undefined) => {
      if (!event) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const target = event?.target as HTMLElement;
      const dataSet = target?.closest<HTMLElement>('[data-contact-id]')?.dataset;
      console.log('contact dataSet: ', dataSet);

      if (dataSet) {
        const contactId = dataSet.contactId;
        console.log('contactId: ', contactId);
        if (!contactId) {
          return;
        }

        if (selectedContactsId.includes(contactId)) {
          dispatch(removeSelectedContact({ contactId }));
        } else {
          const contact = contacts.find(c => c.id === contactId);
          if (contact) {
            dispatch(selectContact(contact));
          }
        }
      }
    },
    [contacts, selectedContactsId, dispatch]
  );

  return (
    <div onClick={onContactCardClicked}>
      {contacts.map(contact => (
        <a href="" key={contact.id}>
          <ContactCard contact={contact} isActive={selectedContactsId.includes(contact.id)} />
        </a>
      ))}
    </div>
  );
};
