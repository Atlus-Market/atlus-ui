import { useInfiniteQuery } from '@tanstack/react-query';
import {
  searchPackages,
  SearchPackagesParams,
  SearchPackagesResponse,
} from '@/api/package/search/search-packages';

interface UseLoadPackagesPagesProps {
  initialPage: SearchPackagesResponse;
  searchQuery: string;
  searchTime: number;
}

export const SearchPackagesKeys = '/packages/search';

export const useLoadPackagesPages = ({
  initialPage,
  searchQuery,
  searchTime,
}: UseLoadPackagesPagesProps) => {
  return useInfiniteQuery<
    SearchPackagesResponse,
    [string, SearchPackagesParams],
    SearchPackagesResponse,
    any
  >({
    queryKey: [SearchPackagesKeys, searchQuery, searchTime],
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
