'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import {
  searchPackages,
  SearchPackagesParams,
  SearchPackagesResponse,
} from '@/api/package/search/search-packages';

interface PackagesListProps {
  searchPackagesResult: SearchPackagesResponse;
}

export const PackagesList = ({ searchPackagesResult }: PackagesListProps) => {
  // const [lastSearchResult, setLastSearchResult] =
  //   useState<SearchPackagesResponse>(searchPackagesResult);

  const { isLoading, isError, error, data, isFetching, fetchNextPage } = useInfiniteQuery<
    SearchPackagesResponse,
    [string, SearchPackagesParams],
    SearchPackagesResponse,
    any
  >({
    queryKey: ['/packages/search'],
    queryFn: ({ pageParam, ...restParams }) => {
      console.log('PARAMS: ', restParams);
      return searchPackages(pageParam);
    },
    initialData: {
      pages: [searchPackagesResult],
      pageParams: [
        {
          q: searchPackagesResult.query,
          page: searchPackagesResult.currentPage,
          per_page: searchPackagesResult.perPage,
        },
      ],
    },
    enabled: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage: SearchPackagesResponse, pages: SearchPackagesResponse[]) => {
      if (lastPage.totalPages === pages.length) {
        return undefined;
      }
      return {
        q: lastPage.query,
        page: lastPage.currentPage + 1,
        per_page: lastPage.perPage,
      };
    },
  });

  console.log('isLoading: ', isLoading);
  console.log('isFetching: ', isFetching);
  console.log('DATA: ', data);

  return (
    <div>
      <button onClick={() => fetchNextPage()}>Fetch Next Page</button>
    </div>
  );
};
