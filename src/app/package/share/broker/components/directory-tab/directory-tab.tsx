import { SearchDirectoriesInput } from '@/app/package/share/broker/components/directory-tab/search-directories-input';
import { DirectoriesList } from '@/app/package/share/broker/components/directory-tab/directories-list';

export const DirectoryTab = () => {
  return (
    <div>
      <SearchDirectoriesInput />
      <DirectoriesList />
    </div>
  );
};
