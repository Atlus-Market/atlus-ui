import { SearchContactsInput } from '@/app/package/share/broker/components/contacts-tab/search-contacts-input';
import { ContactsList } from '@/app/package/share/broker/components/contacts-tab/contacts-list';
import { SharePackageTabContent } from '@/app/package/share/broker/components/share-package-tab-content';

export const ContactsTab = () => {
  return (
    <>
      <SearchContactsInput />
      <SharePackageTabContent>
        <ContactsList />
      </SharePackageTabContent>
    </>
  );
};
