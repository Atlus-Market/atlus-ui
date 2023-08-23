import {
  IPackageDetailsForm
} from '@/app/set-package/(pages)/package-details/package-details-form';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '@/models/contact';
import { dropdownPrivateOption } from '@/components/common/dropdown/visibility-options';

export interface PackageDetailsState {
  packageDetailsForm: IPackageDetailsForm;
  setContact: {
    contacts: Contact[];
    isSetContactModalOpen: boolean;
    activeContactId: string | undefined;
  };
}

export const packageDetailsInitialState: PackageDetailsState = {
  packageDetailsForm: {
    sellerId: '',
    title: '',
    industry: [],
    description: '',
    visibility: dropdownPrivateOption.value,
    isOpenToLicensing: false,
    keywords: [],
    // @ts-ignore
    price: null,
    showPricingPublicly: false
  },
  setContact: {
    contacts: [],
    isSetContactModalOpen: false,
    activeContactId: undefined
  }
};

export const packageDetailsReducer = {
  setPackageDetails: (state: SetPackageState, action: PayloadAction<IPackageDetailsForm>) => {
    state.packageDetails.packageDetailsForm = action.payload;
  },
  showSetContactModal: (state: SetPackageState) => {
    state.packageDetails.setContact.isSetContactModalOpen = true;
  },
  hideSetContactModal: (state: SetPackageState) => {
    state.packageDetails.setContact.isSetContactModalOpen = false;
  },
  setContact: (state: SetPackageState, action: PayloadAction<{ contact: Contact }>) => {
    const contacts = state.packageDetails.setContact.contacts.filter(c => c.id !== action.payload.contact.id);
    contacts.push(action.payload.contact);
    state.packageDetails.setContact.contacts = contacts;
  },
  setContacts: (state: SetPackageState, action: PayloadAction<{ contacts: Contact[] }>) => {
    state.packageDetails.setContact.contacts = [...action.payload.contacts];
  },
  setActiveContact: (state: SetPackageState, action: PayloadAction<{
    contactId: string | undefined
  }>) => {
    state.packageDetails.setContact.activeContactId = action.payload.contactId;
  }
};
