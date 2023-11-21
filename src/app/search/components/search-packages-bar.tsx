import { AtlusSearchBar } from '@/components/common/search/atlus-search-bar';
import { searchPackagesAction } from '@/app/actions/search-packages';
import { searchName } from '@/app/search/consts';
import { SetInputInitialValue } from '@/app/search/components/set-input-initial-value';
import { getAtlusServerSession } from '@/app/(auth)/session/get-atlus-server-session';

export const SearchPackagesBar = async () => {
  const session = await getAtlusServerSession();

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
