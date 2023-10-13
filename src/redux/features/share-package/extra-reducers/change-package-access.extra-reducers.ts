import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import { SharePackageState } from '@/redux/features/share-package/share-package';
import { changePackageAccess } from '@/redux/features/share-package/thunks/change-package-access';
import { PackageAccessValue } from '@/models/package-access-value';
import { PackageAccess } from '@/models/package-access';

export const changePackageAccessExtraReducers = (
  builder: ActionReducerMapBuilder<SharePackageState>
) => {
  builder.addCase(changePackageAccess.pending, (state: SharePackageState, action) => {
    const { meta } = action;
    const payload = meta.arg;
    console.log('changePackageAccess.pending:action ', action);
    state.sharedWithPage.changePackageRequestId = action.meta.requestId;
    if (!state.sharedWithPage.changingPackageAccessEmails.includes(payload.email)) {
      state.sharedWithPage.changingPackageAccessEmails.push(payload.email);
    }
  });

  builder.addCase(changePackageAccess.fulfilled, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.sharedWithPage.changePackageRequestId) {
      return;
    }
    const {
      payload: { email, access },
    } = action;
    console.log('changePackageAccess.fulfilled:action ', action);
    removeEmail(state, email);
    changePackageAccessValue(state, email, access);
  });

  builder.addCase(changePackageAccess.rejected, (state: SharePackageState, action) => {
    if (action.meta.requestId !== state.sharedWithPage.changePackageRequestId) {
      return;
    }
    console.log('changePackageAccess.rejected:action ', action);
  });
};

const removeEmail = (state: SharePackageState, email: string) => {
  state.sharedWithPage.changingPackageAccessEmails =
    state.sharedWithPage.changingPackageAccessEmails.filter(e => e !== email);
};

const changePackageAccessValue = (
  state: SharePackageState,
  email: string,
  access: PackageAccessValue
) => {
  const packageAccess: PackageAccess | undefined = state.sharedWithPage.packageAccess.find(
    pa => pa.email === email
  );
  if (!packageAccess) {
    return;
  }
  packageAccess.access = access;

  if (access === PackageAccessValue.NoAccess) {
    state.sharedWithPage.packageAccess = state.sharedWithPage.packageAccess.filter(
      pa => pa.email !== email
    );
  }
};
