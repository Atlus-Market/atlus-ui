import { searchPackagesOnServer } from '@/api/package/search/search-packages-on-server';
import { searchPackagesQueryParam } from '@/constants/search-packages';

interface SearchPageProps {
  searchParams: {
    [searchPackagesQueryParam]: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams[searchPackagesQueryParam];
  console.log(`search q= ${query}`);

  const response = await searchPackagesOnServer({
    q: query,
    page: 0,
    per_page: 1000,
  });
  console.log(response);
  return <div>Search {query}</div>;
}
