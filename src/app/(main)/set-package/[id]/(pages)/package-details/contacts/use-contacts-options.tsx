import { useMemo } from 'react';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { Contact } from '@/models/contact';
import { ContactOption } from '@/app/(main)/set-package/[id]/(pages)/package-details/contacts/contact-option';

interface UseContactsOptionsProps {
  contacts: Contact[];
}

export const useContactsOptions = ({ contacts }: UseContactsOptionsProps) => {
  return useMemo<DropdownOption<string>[]>(() => {
    if (!contacts) {
      return [];
    }

    const contactsOptions = contacts.map(contact => ({
      value: contact.id,
      data: {
        contact: contact,
      },
      label: <ContactOption contact={contact} />,
    }));

    return [
      {
        options: contactsOptions,
        label: 'Contacts',
        value: 'contacts',
      },
    ];
  }, [contacts]);
};
