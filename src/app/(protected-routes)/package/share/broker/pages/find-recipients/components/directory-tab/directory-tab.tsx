import { SearchDirectoriesInput } from '@/app/(protected-routes)/package/share/broker/pages/find-recipients/components/directory-tab/search-directories-input';
import { DirectoriesList } from '@/app/(protected-routes)/package/share/broker/pages/find-recipients/components/directory-tab/directories-list';
import { SharePackageTabContent } from '@/app/(protected-routes)/package/share/broker/pages/find-recipients/components/share-package-tab-content';

export const DirectoryTab = () => {
  return (
    <>
      <SearchDirectoriesInput />
      <SharePackageTabContent>
        <DirectoriesList />
      </SharePackageTabContent>
    </>
  );
};
