import { searchPackagesOnServer } from '@/api/package/search/search-packages-on-server';
import { searchPackagesQueryParam } from '@/constants/search-packages';
import { getIsBrokerUser } from '@/api/user/get-is-broker-user-on-server';
import { BrokerPackageSearch } from '@/app/search/components/broker-package-search';
import { BuyerPackageSearch } from '@/app/search/components/buyer-package-search';

interface SearchPageProps {
  searchParams: {
    [searchPackagesQueryParam]: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams[searchPackagesQueryParam];
  console.log(`search q= ${query}`);

  const searchPackagesPromise = searchPackagesOnServer({
    q: query,
    page: 0,
    per_page: 1000,
  });

  const [isBrokerUser, searchPackagesResponse] = await Promise.all([
    getIsBrokerUser(),
    searchPackagesPromise,
  ]);
  console.log(searchPackagesResponse);

  return (
    <div>
      Search {query}
      <div>{searchPackagesResponse.packages.length}</div>
      {isBrokerUser ? <BrokerPackageSearch /> : <BuyerPackageSearch />}
    </div>
  );
}
