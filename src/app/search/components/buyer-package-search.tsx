import { BasePackage, SearchPackagesResponse } from '@/api/package/search/search-packages';
import { BasePackageCard } from '@/app/dashboard/components/package/base-package-card';
import { PackageOwner } from '@/app/dashboard/components/package/package-owner';
import { PackageWatchlist } from '@/app/dashboard/components/package/watchlist/package-watchlist';
import { SearchPackageMenu } from '@/app/search/components/search-package-menu';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

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
    queryClient.setQueryData(['/packages/search'], (state: P | undefined) => {
      // const state: P | undefined = queryClient.getQueryData(['/packages/search']);
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

      if (basePackageToUpdate) {
        const updatedBasePackage = {
          ...basePackageToUpdate,
          // isWatched: !basePackageToUpdate.isWatched,
        };

        const newPage = {
          ...pageToReplace,
          packages: pageToReplace.packages.filter(basePackage => basePackage.id !== id),
        };
        newPage.packages.push(updatedBasePackage);

        const pages = [...state.pages.filter(page => page !== pageToReplace), newPage];
        return {
          ...state,
          pages,
        };
      }
      return undefined;
    });
  }, [id, queryClient]);

  return (
    <BasePackageCard
      basePackage={basePackage}
      footer={<PackageOwner basePackage={basePackage} />}
      actions={
        <>
          <PackageWatchlist packageId={basePackage.id} isWatched={basePackage.isWatched} />
          <SearchPackageMenu basePackage={basePackage} />
        </>
      }
    />
  );
};
