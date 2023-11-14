import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import { SharePackageState } from '@/redux/features/share-package/share-package';
import { fetchPackageAccess } from '@/redux/features/share-package/thunks/get-package-access';

export const fetchPackageAccessExtraReducers = (
  builder: ActionReducerMapBuilder<SharePackageState>
) => {
  builder.addCase(fetchPackageAccess.pending, (state: SharePackageState, action) => {
    const { meta } = action;
    const payload = meta.arg;
    console.log('fetchPackageAccess.pending:action ', action);
    state.shareBroker.sharedWithPage.isFetchingPackageAccess = true;
    state.shareBroker.sharedWithPage.activeRequestId = action.meta.requestId;
  });

  builder.addCase(fetchPackageAccess.fulfilled, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.shareBroker.sharedWithPage.activeRequestId) {
      return;
    }
    console.log('fetchPackageAccess.fulfilled:action ', action);
    state.shareBroker.sharedWithPage.isFetchingPackageAccess = false;
    state.shareBroker.sharedWithPage.packageAccess = action.payload;
  });

  builder.addCase(fetchPackageAccess.rejected, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.shareBroker.sharedWithPage.activeRequestId) {
      return;
    }
    console.log('fetchPackageAccess.rejected:action ', action);
    state.shareBroker.sharedWithPage.isFetchingPackageAccess = false;
  });
};
