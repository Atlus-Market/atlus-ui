import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { Contact } from '@/models/contact';

export const contactsFilter = (
  option: FilterOptionOption<DropdownOption<string>>,
  inputText: string
) => {
  if (inputText) {
    const contact = option.data.data?.contact as Contact;
    return (
      contact &&
      [contact.firstName, contact.lastName, contact.companyName].some(contactValue =>
        new RegExp(inputText, 'ig').test(contactValue)
      )
    );
  }
  return true; // if not search, then match all.
};
