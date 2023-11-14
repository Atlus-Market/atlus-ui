import { Contact } from '@/models/contact';

export interface ShareBuyerState {
  searchValue: string;
  isSearchingContacts: boolean;
  activeRequestId: string | undefined;
  contacts: Contact[];
}

export const shareBuyerInitialState: ShareBuyerState = {
  searchValue: '',
  isSearchingContacts: false,
  activeRequestId: undefined,
  contacts: [],
};

export const shareBuyerReducer = {};
