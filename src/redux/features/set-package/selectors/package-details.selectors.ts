import { createSelector } from 'reselect';
import {
  selectSetPackageState
} from '@/redux/features/set-package/selectors/set-package.selectors';


const selectPackageDetailsState = createSelector(
  selectSetPackageState,
  state => state.packageDetails
);

export const selectPackageDetailsFormValues = createSelector(
  selectPackageDetailsState,
  state => state.packageDetailsForm
);

export const selectIsSetContactModalOpen = createSelector(
  selectPackageDetailsState,
  state => state.setContact.isSetContactModalOpen
);

export const selectActiveContact = createSelector(
  selectPackageDetailsState,
  state => {
    return state.setContact.contacts.find(contact => contact.id === state.setContact.activeContactId);
  }
);

export const selectContacts = createSelector(
  selectPackageDetailsState,
  state => {
    return state.setContact.contacts;
  }
);
