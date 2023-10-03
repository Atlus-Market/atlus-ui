import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveTab } from '@/redux/features/share-package/selectors/share-package.selectors';
import { setSharePackageActiveTab } from '@/redux/features/share-package/share-package';
import { AtlusTabs } from '@/components/ui/tabs/atlus-tabs';
import { AtlusTab } from '@/components/ui/tabs/atlus-tab';
import { SharePackageTab } from '@/app/package/share/commom/share-package-tab';

export const SharePackageTabsHeader = () => {
  const dispatch = useDispatch();
  const activeTab = useAppSelector(selectActiveTab);

  return (
    <AtlusTabs className="!mb-0">
      <AtlusTab
        isActive={activeTab === SharePackageTab.Contacts}
        text="Contacts"
        onSelected={() => dispatch(setSharePackageActiveTab(SharePackageTab.Contacts))}
      />
      <AtlusTab
        isActive={activeTab === SharePackageTab.Directory}
        text="Directory"
        onSelected={() => dispatch(setSharePackageActiveTab(SharePackageTab.Directory))}
      />
      <AtlusTab
        isActive={activeTab === SharePackageTab.SharedWith}
        text="Shared with"
        onSelected={() => dispatch(setSharePackageActiveTab(SharePackageTab.SharedWith))}
      />
    </AtlusTabs>
  );
};
