import { AtlusSearchBar } from '@/components/common/search/atlus-search-bar';
import { searchPackagesAction } from '@/app/actions/search-packages';
import { getServerSession } from 'next-auth';
import { searchName } from '@/app/search/consts';
import { SetInputInitialValue } from '@/app/search/components/set-input-initial-value';

export const SearchPackagesBar = async () => {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  return (
    <form action={searchPackagesAction} className="w-full flex justify-center items-center">
      <SetInputInitialValue />
      <AtlusSearchBar placeholder="Search for packages" name={searchName} />
      <input type="hidden" />
    </form>
  );
};
