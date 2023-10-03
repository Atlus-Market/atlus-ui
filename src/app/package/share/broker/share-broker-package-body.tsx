'use client';

import { reset } from '@/redux/features/share-package/share-package';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SharePackageTabsHeader } from '@/app/package/share/broker/components/share-package-tabs-header';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveTab } from '@/redux/features/share-package/selectors/share-package.selectors';
import { SharePackageTab } from '@/app/package/share/commom/share-package-tab';
import { ContactsTab } from '@/app/package/share/broker/components/contacts-tab/contacts-tab';
import { DirectoryTab } from '@/app/package/share/broker/components/directory-tab/directory-tab';
import { SharedWithTab } from '@/app/package/share/broker/components/shared-with-tab/shared-with-tab';

export const ShareBrokerPackageBody = () => {
  const dispatch = useDispatch();
  const activeTab = useAppSelector(selectActiveTab);

  // Reset share package store
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div>
      <SharePackageTabsHeader />
      <div className="py-5">
        {activeTab === SharePackageTab.Contacts && <ContactsTab />}
        {activeTab === SharePackageTab.Directory && <DirectoryTab />}
        {activeTab === SharePackageTab.SharedWith && <SharedWithTab />}
      </div>
    </div>
  );
};
