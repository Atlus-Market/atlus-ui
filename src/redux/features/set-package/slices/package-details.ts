import {
  IPackageDetailsForm
} from '@/app/set-package/(pages)/package-details/package-details-form';
import { SetPackageState } from '@/redux/features/set-package/set-package';
import { PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '@/models/contact';
import { dropdownPublicOption } from '@/components/common/dropdown/visibility-options';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import {
  packageTitleValidator
} from '@/redux/features/set-package/thunks/package-title-validator.thunk';

export interface PackageDetailsState {
  packageDetailsForm: IPackageDetailsForm;
  setContact: {
    contacts: Contact[];
    isSetContactModalOpen: boolean;
    activeContactId: string | undefined;
  };
  titleValidation: {
    requestId: string | undefined;
    isValidatingTitle: boolean;
    isValidTitle: boolean;
  };
}

export const packageDetailsInitialState: PackageDetailsState = {
  packageDetailsForm: {
    sellerUserId: '',
    title: '',
    industryIds: [],
    description: '',
    visibility: dropdownPublicOption.value,
    openToLicensing: false,
    keywords: [],
    // @ts-ignore
    priceUsd: null,
    showPublicPricing: false
  },
  setContact: {
    contacts: [],
    isSetContactModalOpen: false,
    activeContactId: undefined
  },
  titleValidation: {
    requestId: undefined,
    isValidatingTitle: false,
    isValidTitle: false
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

export const packageTitleValidatorExtraReducers = (builder: ActionReducerMapBuilder<SetPackageState>) => {
  builder.addCase(packageTitleValidator.pending, (state: SetPackageState, action) => {
    const { meta } = action;
    const payload = meta.arg;
    console.log('packageTitleValidator.pending:action ', action);
    state.packageDetails.titleValidation.requestId = meta.requestId;
    state.packageDetails.titleValidation.isValidatingTitle = true;
    state.packageDetails.titleValidation.isValidTitle = false;
  });

  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(packageTitleValidator.fulfilled, (state: SetPackageState, action) => {
    console.log('packageTitleValidator.fulfilled:action ', action);
    const { meta } = action;

    if (meta.requestId !== state.packageDetails.titleValidation.requestId) {
      return;
    }

    state.packageDetails.titleValidation.isValidatingTitle = false;
    state.packageDetails.titleValidation.isValidTitle = true;
  });

  builder.addCase(packageTitleValidator.rejected, (state: SetPackageState, action) => {
    console.log('packageTitleValidator.rejected:action ', action);
    const { meta } = action;

    if (meta.requestId !== state.packageDetails.titleValidation.requestId) {
      return;
    }

    state.packageDetails.titleValidation.isValidatingTitle = false;
    state.packageDetails.titleValidation.isValidTitle = false;
  });
};
