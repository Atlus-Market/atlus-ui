import { searchPackagesOnServer } from '@/api/package/search/search-packages-on-server';
import { searchPackagesQueryParam } from '@/constants/search-packages';
import { getIsBrokerUser } from '@/api/user/get-is-broker-user-on-server';
import { LoadMorePackages } from '@/app/search/components/load-more-packages';
import { PackagesList } from '@/app/search/components/packages-list';

interface SearchPageProps {
  searchParams: {
    [searchPackagesQueryParam]: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchPackagesPromise = searchPackagesOnServer({
    q: searchParams[searchPackagesQueryParam],
    page: 0,
    per_page: 1,
  });

  const [isBrokerUser, searchPackagesResponse] = await Promise.all([
    getIsBrokerUser(),
    searchPackagesPromise,
  ]);

  return (
    <div>
      <div className="mb-[1px]">
        <div>{searchPackagesResponse.packages.length}</div>
      </div>
      <PackagesList searchPackagesResult={searchPackagesResponse} />
      {/*<LoadMorePackages />*/}
    </div>
  );
}
