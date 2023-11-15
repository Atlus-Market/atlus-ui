import { searchPackagesOnServer } from '@/api/package/search/search-packages-on-server';

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q;
  console.log(`search q= ${query}`);

  const response = await searchPackagesOnServer({
    q: query,
    page: 0,
    per_page: 1000,
  });
  console.log(response);
  return <div>Search {query}</div>;
}
