'use client';

import { reset } from '@/redux/features/share-package/share-package';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SharePackageTabsHeader } from '@/app/package/share/broker/components/share-package-tabs-header';
import { useAppSelector } from '@/redux/hooks';
import { SharePackageFindRecipientsTab } from '@/app/package/share/commom/share-package-find-recipients-tab';
import { ContactsTab } from '@/app/package/share/broker/components/contacts-tab/contacts-tab';
import { DirectoryTab } from '@/app/package/share/broker/components/directory-tab/directory-tab';
import { SharedWithTab } from '@/app/package/share/broker/components/shared-with-tab/shared-with-tab';
import { selectFindRecipientsActiveTab } from '@/redux/features/share-package/selectors/find-recipients.selectors';

export const ShareBrokerPackageBody = () => {
  const dispatch = useDispatch();
  const activeTab = useAppSelector(selectFindRecipientsActiveTab);

  // Reset share package store
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div>
      <SharePackageTabsHeader />
      <div className="py-5">
        {activeTab === SharePackageFindRecipientsTab.Contacts && <ContactsTab />}
        {activeTab === SharePackageFindRecipientsTab.Directory && <DirectoryTab />}
        {activeTab === SharePackageFindRecipientsTab.SharedWith && <SharedWithTab />}
      </div>
    </div>
  );
};
