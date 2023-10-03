import { createSelector } from 'reselect';
import { selectFindRecipientsPageState } from '@/redux/features/share-package/selectors/find-recipients.selectors';

export const selectContactsState = createSelector(
  selectFindRecipientsPageState,
  state => state.contactsTab
);

export const selectContacts = createSelector(
  selectFindRecipientsPageState,
  state => state.contactsTab.contacts
);

export const selectSelectedContacts = createSelector(
  selectFindRecipientsPageState,
  state => state.contactsTab.selectedContacts
);

export const selectSelectedContactsIds = createSelector(selectFindRecipientsPageState, state => {
  return state.contactsTab.selectedContacts.map(contact => contact.id);
});

export const selectIsSearchingContacts = createSelector(
  selectContactsState,
  state => state.isSearchingContacts
);
