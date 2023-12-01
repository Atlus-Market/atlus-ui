'use client';
import { PackageWatchlistButton } from '@/app/(main)/dashboard/components/package/watchlist/package-watchlist-button';
import { toggleWatchPackageAction } from '@/app/actions/toggle-package-watchlist-status.action';
import { useTransition } from 'react';
import { showErrorNotification } from '@/components/ui/notification/atlus-notification';

interface PackageWatchlistProps {
  packageId: string;
  isWatched: boolean;
  onWatchChanged?: () => void;
}

export const PackageWatchlist = ({
  packageId,
  isWatched,
  onWatchChanged,
}: PackageWatchlistProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      onSubmit={e => {
        e.stopPropagation();
        e.preventDefault();
        startTransition(async () => {
          const state = await toggleWatchPackageAction(packageId, isWatched);
          if (state && state.error) {
            let text = '';
            if (isWatched) {
              text = 'An error occurred while removing the package to watchlist.';
            } else {
              text = 'An error occurred while adding the package to watchlist.';
            }

            showErrorNotification({ text });
          } else if (state && !state.error) {
            onWatchChanged?.();
          }
        });
      }}
      className="flex items-center"
    >
      <PackageWatchlistButton isWatched={isWatched} isLoading={isPending} />
    </form>
  );
};
