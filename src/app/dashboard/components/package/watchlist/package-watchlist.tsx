'use client';
import { PackageWatchlistButton } from '@/app/dashboard/components/package/watchlist/package-watchlist-button';
import {
  TogglePackageWatchlistResponse,
  toggleWatchPackageAction,
} from '@/app/actions/toggle-package-watchlist-status.action';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
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
  const formActionWithParams = toggleWatchPackageAction.bind(null, packageId, isWatched);
  const [state, formAction] = useFormState<TogglePackageWatchlistResponse | null>(
    formActionWithParams,
    null
  );

  useEffect(() => {
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
  }, [isWatched, onWatchChanged, state]);

  return (
    <form action={formAction} className="flex items-center">
      <PackageWatchlistButton isWatched={isWatched} />
    </form>
  );
};
