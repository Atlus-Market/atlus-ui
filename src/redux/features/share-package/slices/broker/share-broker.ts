import { SharePackagePage } from '@/app/(main)/package/share/broker/components/commom/share-package-page';
import {
  findRecipientsPageInitialState,
  FindRecipientsPageState,
  findRecipientsReducers,
} from '@/redux/features/share-package/slices/broker/find-recipients/find-recipients';
import {
  sharedWithInitialState,
  sharedWithReducer,
  SharedWithState,
} from '@/redux/features/share-package/slices/broker/shared-with';
import { PayloadAction } from '@reduxjs/toolkit';
import { SharePackageState } from '@/redux/features/share-package/share-package';

export interface ShareBrokerState {
  activePage: SharePackagePage;
  findRecipientsPage: FindRecipientsPageState;
  sharedWithPage: SharedWithState;
}

export const shareBrokerInitialState: ShareBrokerState = {
  activePage: SharePackagePage.FindRecipients,
  findRecipientsPage: findRecipientsPageInitialState,
  sharedWithPage: sharedWithInitialState,
};

export const shareBrokerReducer = {
  setActivePage: (state: SharePackageState, action: PayloadAction<SharePackagePage>) => {
    state.shareBroker.activePage = action.payload;
  },
  ...findRecipientsReducers,
  ...sharedWithReducer,
};
