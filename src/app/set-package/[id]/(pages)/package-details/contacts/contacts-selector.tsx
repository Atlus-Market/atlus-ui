'use client';

import { AddContactOption } from '@/app/set-package/[id]/(pages)/package-details/contacts/add-contact-button';
import { AddContactModal } from '@/app/set-package/[id]/(pages)/package-details/contacts/add-contact/add-contact-modal';
import { useQuery } from '@tanstack/react-query';
import { getContacts } from '@/api/contacts/get-contacts';
import { useEffect, useState } from 'react';
import { Contact } from '@/models/contact';
import { HiSearch, HiX } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  hideSetContactModal,
  setActiveContact,
  setContact,
  setContacts,
  showSetContactModal,
} from '@/redux/features/set-package/set-package';
import {
  selectActiveContact,
  selectContacts,
  selectIsSetContactModalOpen,
} from '@/redux/features/set-package/selectors/package-details.selectors';
import { HiPencil } from 'react-icons/hi2';
import { ActiveContact } from '@/app/set-package/[id]/(pages)/package-details/contacts/active-contact';
import { AtlusFormDropdownList } from '@/components/ui/form/atlus-form-dropdown';
import { useFormContext, useWatch } from 'react-hook-form';
import { contactsFilter } from '@/app/set-package/[id]/(pages)/package-details/contacts/contacts.utils';
import { IPackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/package-details-form';
import { useContactsOptions } from '@/app/set-package/[id]/(pages)/package-details/contacts/use-contacts-options';

interface SellerSelectorProps {}

const name = 'sellerUserId';

export const ContactsSelector = ({}: SellerSelectorProps) => {
  const [contactModalInitialValue, setContactModalInitialValue] = useState<Contact | undefined>();
  const { setValue } = useFormContext<IPackageDetailsForm>();
  const { isFetching, data } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => getContacts(),
    refetchOnWindowFocus: true,
  });

  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const isSetContactModalOpen = useAppSelector(selectIsSetContactModalOpen);
  const selectedContact = useAppSelector(selectActiveContact);

  const selectedSellerId = useWatch({ name });
  const isSellerSelected = !!selectedSellerId;

  console.log('activeContact: ', selectedContact);
  console.log('selectedSellerId: ', selectedSellerId);

  useEffect(() => {
    dispatch(setContacts({ contacts: data?.contacts ?? [] }));
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setActiveContact({ contactId: selectedSellerId }));
  }, [dispatch, selectedSellerId]);

  const contactOptions = useContactsOptions({ contacts });

  const addContactElement = (
    <AddContactOption
      onClick={() => {
        setContactModalInitialValue(undefined);
        dispatch(showSetContactModal());
      }}
    />
  );

  const editContactElement = (
    <button
      className="mr-2"
      onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();
        setContactModalInitialValue(selectedContact);
        dispatch(showSetContactModal());
      }}
    >
      <HiPencil size={18} color="var(--color-orange)" />
    </button>
  );

  return (
    <>
      <AddContactModal
        isOpen={isSetContactModalOpen}
        onClose={() => dispatch(hideSetContactModal())}
        initialValues={contactModalInitialValue}
        onContactAdded={(contact: Contact) => {
          dispatch(setContact({ contact }));
          setValue(name, contact.id);
          dispatch(hideSetContactModal());
        }}
      />
      <AtlusFormDropdownList
        name={name}
        label="Contact Name"
        isLoading={isFetching}
        isSearchable={!isSellerSelected}
        placeholder="Select a contact"
        leftIcon={<HiSearch size={20} color="#A4A2A0" />}
        filterOption={contactsFilter}
        options={contactOptions}
        value={selectedSellerId}
        indicatorsExtraCmp={!isFetching && isSellerSelected ? editContactElement : null}
        isClearable={isSellerSelected}
        clearIndicator={
          isSellerSelected && (
            <button>
              <HiX size={24} color="var(--color-orange)" />
            </button>
          )
        }
        showDropdownIndicator={!isSellerSelected}
        defaultValue={selectedSellerId}
        groupHeadingHeader={<div className="pt-[10px] pb-5">{addContactElement}</div>}
        noOptionsMessage={<div className="px-4 py-[10px]">{addContactElement}</div>}
        bottomText="Specify which seller you’re representing. This is for your records only and cannot be seen by others."
      />
      {selectedContact && (
        <div className="mt-6">
          <ActiveContact contact={selectedContact} />
        </div>
      )}
    </>
  );
};
