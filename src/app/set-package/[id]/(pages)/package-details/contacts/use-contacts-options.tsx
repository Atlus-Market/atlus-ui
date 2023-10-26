import { useMemo } from 'react';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { AtlusContact } from '@/components/common/atlus-contact';
import { Contact } from '@/models/contact';

interface UseContactsOptionsProps {
  contacts: Contact[];
}

export const useContactsOptions = ({ contacts }: UseContactsOptionsProps) => {
  return useMemo<DropdownOption<string>[]>(() => {
    if (!contacts) {
      return [];
    }

    const contactsOptions = contacts.map(c => ({
      value: c.id,
      data: {
        contact: c,
      },
      label: (
        <AtlusContact
          size="medium"
          recipient={c}
          subLines={[c.companyName]}
          wrapperClassnames="!p-0"
        />
      ),
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
