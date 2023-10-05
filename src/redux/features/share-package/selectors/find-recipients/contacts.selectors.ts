import { createSelector } from 'reselect';
import { selectFindRecipientsPageState } from '@/redux/features/share-package/selectors/find-recipients.selectors';

export const selectContactsState = createSelector(
  selectFindRecipientsPageState,
  state => state.contactsTab
);

export const selectContacts = createSelector(selectContactsState, state => state.contacts);

export const selectSelectedContacts = createSelector(
  selectContactsState,
  state => state.selectedContacts
);

export const selectSelectedContactsIds = createSelector(selectContactsState, state => {
  return state.selectedContacts.map(contact => contact.id);
});

export const selectIsSearchingContacts = createSelector(
  selectContactsState,
  state => state.isSearchingContacts
);

export const selectContactsSearchValue = createSelector(
  selectContactsState,
  state => state.searchValue
);
