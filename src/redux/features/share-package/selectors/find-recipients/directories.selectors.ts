import { createSelector } from 'reselect';
import { selectFindRecipientsPageState } from '@/redux/features/share-package/selectors/find-recipients.selectors';

export const selectDirectoriesState = createSelector(
  selectFindRecipientsPageState,
  state => state.directoriesTab
);

export const selectDirectories = createSelector(selectDirectoriesState, state => state.directories);

export const selectSelectedDirectories = createSelector(
  selectDirectoriesState,
  state => state.selectedDirectories
);

export const selectSelectedDirectoriesIds = createSelector(selectDirectoriesState, state => {
  return state.selectedDirectories.map(directory => directory.id);
});

export const selectIsSearchingDirectories = createSelector(
  selectDirectoriesState,
  state => state.isSearchingDirectories
);

export const selectDirectoriesSearchValue = createSelector(
  selectDirectoriesState,
  state => state.searchValue
);
