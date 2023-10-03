import { SearchContactsInput } from '@/app/package/share/broker/components/contacts-tab/search-contacts-input';
import { ContactsList } from '@/app/package/share/broker/components/contacts-tab/contacts-list';

export const ContactsTab = () => {
  return (
    <div>
      <SearchContactsInput />
      <ContactsList />
    </div>
  );
};
