import { SearchContactsInput } from '@/app/(protected-routes)/package/share/broker/pages/find-recipients/components/contacts-tab/search-contacts-input';
import { ContactsList } from '@/app/(protected-routes)/package/share/broker/pages/find-recipients/components/contacts-tab/contacts-list';
import { SharePackageTabContent } from '@/app/(protected-routes)/package/share/broker/pages/find-recipients/components/share-package-tab-content';

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
