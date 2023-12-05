import { useInfiniteQuery } from '@tanstack/react-query';
import {
  searchPackages,
  SearchPackagesParams,
  SearchPackagesResponse,
} from '@/api/package/search/search-packages';
import { useMemo } from 'react';

interface UseLoadPackagesPagesProps {
  initialPage: SearchPackagesResponse;
  searchQuery: string;
}

export const SearchPackagesKeys = '/packages/search';

export const useLoadPackagesPages = ({ initialPage, searchQuery }: UseLoadPackagesPagesProps) => {
  const searchTime = useMemo(() => `${searchQuery}-${Date.now()}`, [searchQuery]);

  return useInfiniteQuery<
    SearchPackagesResponse,
    [string, SearchPackagesParams],
    SearchPackagesResponse,
    any
  >({
    queryKey: [SearchPackagesKeys, searchTime],
    queryFn: ({ pageParam, ...restParams }) => searchPackages(pageParam),
    initialData: {
      pages: [initialPage],
      pageParams: [
        {
          q: initialPage.query,
          page: initialPage.currentPage,
          per_page: initialPage.perPage,
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
};
