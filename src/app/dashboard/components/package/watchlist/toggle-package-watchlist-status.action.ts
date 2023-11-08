'use server';

import { removePackageFromWatchlistOnServer } from '@/api/package/remove-package-from-watchlist-on-server';
import { addPackageToWatchlistOnServer } from '@/api/package/add-package-to-watchlist-on-server';
import { revalidatePath } from 'next/cache';
import { BuyerDashboardShared } from '@/constants/routes';

export interface TogglePackageWatchlistResponse {
  error: boolean;
}

export const toggleWatchPackage = async (
  packageId: string,
  isWatched: boolean
): Promise<TogglePackageWatchlistResponse> => {
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
    return {
      error: true,
    };
  }
};
