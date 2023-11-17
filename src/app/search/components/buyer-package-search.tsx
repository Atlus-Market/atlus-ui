import { BasePackage, SearchPackagesResponse } from '@/api/package/search/search-packages';
import { BasePackageCard } from '@/app/dashboard/components/package/base-package-card';
import { PackageOwner } from '@/app/dashboard/components/package/package-owner';
import { PackageWatchlist } from '@/app/dashboard/components/package/watchlist/package-watchlist';
import { SearchPackageMenu } from '@/app/search/components/search-package-menu';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { SearchPackagesKeys } from '@/app/search/hooks/use-load-packages-pages';

interface BuyerPackageSearchProps {
  basePackage: BasePackage;
}

interface P {
  pages: SearchPackagesResponse[];
}

export const BuyerPackageSearch = ({ basePackage }: BuyerPackageSearchProps) => {
  const { id } = basePackage;
  const queryClient = useQueryClient();

  const onUpdate = useCallback(() => {
    queryClient.setQueryData<InfiniteData<SearchPackagesResponse>>([SearchPackagesKeys], state => {
      if (!state) {
        return;
      }

      const pageToReplace = state.pages.find(page =>
        page.packages.some(basePackage => basePackage.id === id)
      );

      if (!pageToReplace) {
        return;
      }

      const basePackageToUpdate = state.pages
        .flatMap(page => page.packages)
        .find(basePackage => basePackage.id === id);

      if (!basePackageToUpdate) {
        return;
      }

      const updatedBasePackage = {
        ...basePackageToUpdate,
        isWatched: !basePackageToUpdate.isWatched,
      };

      const newPage = {
        ...pageToReplace,
        packages: [...pageToReplace.packages],
      };
      const packageIndex = pageToReplace.packages.indexOf(basePackageToUpdate);
      newPage.packages[packageIndex] = updatedBasePackage;

      const pages = [...state.pages];
      const pageIndex = state.pages.indexOf(pageToReplace);
      pages[pageIndex] = newPage;

      return {
        ...state,
        pages,
      };
    });
  }, [id, queryClient]);

  return (
    <BasePackageCard
      basePackage={basePackage}
      footer={<PackageOwner basePackage={basePackage} />}
      actions={
        <>
          <PackageWatchlist
            packageId={basePackage.id}
            isWatched={basePackage.isWatched}
            onWatchChanged={onUpdate}
          />
          <SearchPackageMenu basePackage={basePackage} />
        </>
      }
    />
  );
};
