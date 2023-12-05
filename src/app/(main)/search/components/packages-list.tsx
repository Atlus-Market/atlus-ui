'use client';

import { SearchPackagesResponse } from '@/api/package/search/search-packages';
import { useLoadPackagesPages } from '@/app/(main)/search/hooks/use-load-packages-pages';
import { SharePackageModal } from '@/app/(main)/package/share/share-package-modal';
import { PackageLink } from '@/app/(main)/dashboard/components/package/package-link';
import { PackagesListWrapper } from '@/app/(main)/dashboard/components/packages-list-wrapper';
import { BuyerPackageSearch } from '@/app/(main)/search/components/buyer-package-search';
import { BrokerPackageSearch } from '@/app/(main)/search/components/broker-package-search';
import { AtlusIsVisible } from '@/components/common/atlus-is-visible';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';

interface PackagesListProps {
  searchPackagesResult: SearchPackagesResponse;
  searchQuery: string;
  searchTime: number;
}

export const PackagesList = ({ searchPackagesResult, searchQuery }: PackagesListProps) => {
  const { data, fetchNextPage, isFetching, hasNextPage } = useLoadPackagesPages({
    initialPage: searchPackagesResult,
    searchQuery,
  });

  if (!data) {
    return null;
  }

  return (
    <div>
      <div>
        {searchPackagesResult.packages.map(p => (
          <div key={p.id}>{p.title}</div>
        ))}
      </div>
      <SharePackageModal useSimpleShareModal={true} />
      <PackageLink>
        <PackagesListWrapper>
          {data?.pages.flatMap(page => {
            const PackageCmp = page.type === 'broker' ? BrokerPackageSearch : BuyerPackageSearch;
            return page.packages.map(p => <PackageCmp basePackage={p} key={p.id} />);
          })}
        </PackagesListWrapper>
      </PackageLink>
      <AtlusIsVisible
        enabled={hasNextPage}
        onVisibilityChange={inView => {
          if (inView && !isFetching) {
            fetchNextPage();
          }
        }}
      >
        <div className="w-full h-[100px] flex justify-center items-center">
          <AtlusLoadingSpinner />
        </div>
      </AtlusIsVisible>
    </div>
  );
};
