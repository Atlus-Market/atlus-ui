'use client';

import { SearchPackagesResponse } from '@/api/package/search/search-packages';
import { useLoadPackagesPages } from '@/app/(main)/search/hooks/use-load-packages-pages';
import { AtlusIsVisible } from '@/components/common/atlus-is-visible';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';
import { BuyerPackageSearch } from '@/app/(main)/search/components/buyer-package-search';
import { PackageLink } from '@/app/(main)/dashboard/components/package/package-link';
import { PackagesListWrapper } from '@/app/(main)/dashboard/components/packages-list-wrapper';
import { SharePackageModal } from '@/app/(main)/package/share/share-package-modal';
import { BrokerPackageSearch } from '@/app/(main)/search/components/broker-package-search';

interface PackagesListProps {
  searchPackagesResult: SearchPackagesResponse;
}

export const PackagesList = ({ searchPackagesResult }: PackagesListProps) => {
  const { data, fetchNextPage, isFetching, hasNextPage } = useLoadPackagesPages({
    initialPage: searchPackagesResult,
  });

  if (!data) {
    return null;
  }

  return (
    <div>
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
