'use client';

import {
  AtlusDropdownList,
  DropdownOption
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import {
  AddContactOption
} from '@/app/set-package/(pages)/package-details/contacts/add-contact-button';
import {
  AddContactModal
} from '@/app/set-package/(pages)/package-details/contacts/add-contact/add-contact-modal';
import { useToggle } from '@uidotdev/usehooks';

interface SellerSelectorProps {

}

const options: DropdownOption[] = [
  {
    label: 'Contacts',
    value: 'contacts',
    options: [
      {
        label: 'Contact 1',
        value: 'contact 1'
      }
    ]
  }
];

export const ContactsSelector = ({}: SellerSelectorProps) => {
  const [isOpen, setIsOpen] = useToggle(false);
  return (
    <>
      <AddContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <AtlusDropdownList
        options={options}
        groupHeadingHeader={<AddContactOption onClick={() => setIsOpen(true)} />}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </>

  );
};
