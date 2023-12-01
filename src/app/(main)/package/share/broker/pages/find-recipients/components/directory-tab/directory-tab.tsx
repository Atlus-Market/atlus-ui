import { SearchDirectoriesInput } from '@/app/(main)/package/share/broker/pages/find-recipients/components/directory-tab/search-directories-input';
import { DirectoriesList } from '@/app/(main)/package/share/broker/pages/find-recipients/components/directory-tab/directories-list';
import { SharePackageTabContent } from '@/app/(main)/package/share/broker/pages/find-recipients/components/share-package-tab-content';

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
