import { searchPackagesOnServer } from '@/api/package/search/search-packages-on-server';
import { searchPackagesQueryParam } from '@/constants/search-packages';
import { PackagesList } from '@/app/search/components/packages-list';

interface SearchPageProps {
  searchParams: {
    [searchPackagesQueryParam]: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchPackagesResponse = await searchPackagesOnServer({
    q: searchParams[searchPackagesQueryParam],
    page: 1,
    per_page: 1,
  });

  if (searchPackagesResponse.packages.length === 0) {
    return <div>No packages found</div>;
  }

  return <PackagesList searchPackagesResult={searchPackagesResponse} />;
}
