import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import { SharePackageState } from '@/redux/features/share-package/share-package';
import { changePackageAccess } from '@/redux/features/share-package/thunks/change-package-access';

export const changePackageAccessExtraReducers = (
  builder: ActionReducerMapBuilder<SharePackageState>
) => {
  builder.addCase(changePackageAccess.pending, (state: SharePackageState, action) => {
    const { meta } = action;
    const payload = meta.arg;
    console.log('changePackageAccess.pending:action ', action);
    state.sharedWithPage.changePackageRequestId = action.meta.requestId;
    state.sharedWithPage.isChangingPackageAccess = true;
  });

  builder.addCase(changePackageAccess.fulfilled, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.sharedWithPage.changePackageRequestId) {
      return;
    }
    console.log('changePackageAccess.fulfilled:action ', action);
    state.sharedWithPage.isChangingPackageAccess = false;
  });

  builder.addCase(changePackageAccess.rejected, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.sharedWithPage.changePackageRequestId) {
      return;
    }
    console.log('changePackageAccess.rejected:action ', action);
    state.sharedWithPage.isChangingPackageAccess = false;
  });
};
