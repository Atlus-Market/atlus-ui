import { SearchDirectoriesInput } from '@/app/package/share/broker/pages/find-recipients/components/directory-tab/search-directories-input';
import { DirectoriesList } from '@/app/package/share/broker/pages/find-recipients/components/directory-tab/directories-list';
import { SharePackageTabContent } from '@/app/package/share/broker/pages/find-recipients/components/share-package-tab-content';

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
