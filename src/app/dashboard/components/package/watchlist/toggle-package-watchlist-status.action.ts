'use server';

import { removePackageFromWatchlistOnServer } from '@/api/package/watch/remove-package-from-watchlist-on-server';
import { addPackageToWatchlistOnServer } from '@/api/package/watch/add-package-to-watchlist-on-server';
import { revalidatePath } from 'next/cache';
import { BuyerDashboardShared } from '@/constants/routes';

export interface TogglePackageWatchlistResponse {
  error: boolean;
}

let queue = Promise.resolve({ error: false });

export const toggleWatchPackage = async (
  packageId: string,
  isWatched: boolean
): Promise<TogglePackageWatchlistResponse> => {
  return queue.then(async () => {
    try {
      if (isWatched) {
        await removePackageFromWatchlistOnServer(packageId);
      } else {
        await addPackageToWatchlistOnServer(packageId);
      }
      revalidatePath(BuyerDashboardShared);
      return {
        error: false,
      };
    } catch (e) {
      console.log(e);
      return {
        error: true,
      };
    }
  });
};
