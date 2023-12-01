import { searchPackagesOnServer } from '@/api/package/search/search-packages-on-server';
import { searchPackagesQueryParam } from '@/constants/search-packages';
import { PackagesList } from '@/app/(main)/search/components/packages-list';
import SearchItemSVG from '@/public/assets/images/search_item.svg';
import { NoData } from '@/components/common/no-data';

interface SearchPageProps {
  searchParams: {
    [searchPackagesQueryParam]: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchPackagesResponse = await searchPackagesOnServer({
    q: searchParams[searchPackagesQueryParam],
    page: 1,
    per_page: 10,
  });

  console.log(`Searching for "${searchParams[searchPackagesQueryParam]}"`);
  console.log(`Searching results.packages: ${searchPackagesResponse.packages.length}`);

  if (searchPackagesResponse.packages.length === 0) {
    return <NoData image={SearchItemSVG} subtitle="No packages found" />;
  }

  return <PackagesList searchPackagesResult={searchPackagesResponse} />;
}
