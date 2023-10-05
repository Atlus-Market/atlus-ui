'use client';

import { SharePackageTabsHeader } from '@/app/package/share/broker/components/share-package-tabs-header';
import { useAppSelector } from '@/redux/hooks';
import { SharePackageFindRecipientsTab } from '@/app/package/share/broker/components/commom/share-package-find-recipients-tab';
import { ContactsTab } from '@/app/package/share/broker/components/contacts-tab/contacts-tab';
import { DirectoryTab } from '@/app/package/share/broker/components/directory-tab/directory-tab';
import { SharedWithTab } from '@/app/package/share/broker/components/shared-with-tab/shared-with-tab';
import { selectFindRecipientsActiveTab } from '@/redux/features/share-package/selectors/find-recipients.selectors';
import clsx from 'clsx';
import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';

export const ShareBrokerPackageBody = () => {
  const activeTab = useAppSelector(selectFindRecipientsActiveTab);

  return (
    <div>
      <div className={clsx(atlusModalBodyPaddingX)}>
        <SharePackageTabsHeader />
      </div>
      <div className="py-5">
        {activeTab === SharePackageFindRecipientsTab.Contacts && <ContactsTab />}
        {activeTab === SharePackageFindRecipientsTab.Directory && <DirectoryTab />}
        {activeTab === SharePackageFindRecipientsTab.SharedWith && <SharedWithTab />}
      </div>
    </div>
  );
};
