import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hooks';
import { setSharePackageActiveTab } from '@/redux/features/share-package/share-package';
import { AtlusTabs } from '@/components/ui/tabs/atlus-tabs';
import { AtlusTab } from '@/components/ui/tabs/atlus-tab';
import { SharePackageFindRecipientsTab } from '@/app/package/share/commom/share-package-find-recipients-tab';
import { selectFindRecipientsActiveTab } from '@/redux/features/share-package/selectors/find-recipients.selectors';

export const SharePackageTabsHeader = () => {
  const dispatch = useDispatch();
  const activeTab = useAppSelector(selectFindRecipientsActiveTab);

  return (
    <AtlusTabs className="!mb-0">
      <AtlusTab
        isActive={activeTab === SharePackageFindRecipientsTab.Contacts}
        text="Contacts"
        onSelected={() =>
          dispatch(setSharePackageActiveTab(SharePackageFindRecipientsTab.Contacts))
        }
      />
      <AtlusTab
        isActive={activeTab === SharePackageFindRecipientsTab.Directory}
        text="Directory"
        onSelected={() =>
          dispatch(setSharePackageActiveTab(SharePackageFindRecipientsTab.Directory))
        }
      />
      <AtlusTab
        isActive={activeTab === SharePackageFindRecipientsTab.SharedWith}
        text="Shared with"
        onSelected={() =>
          dispatch(setSharePackageActiveTab(SharePackageFindRecipientsTab.SharedWith))
        }
      />
    </AtlusTabs>
  );
};
