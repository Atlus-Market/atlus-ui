import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { isArray } from 'lodash';

export const searchDropdownOption = (options: Readonly<DropdownOption[]>, value: string): DropdownOption | undefined => {
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    let optionFound = undefined;
    if (!option.options) {
      optionFound = option.value === value ? option : undefined;
    } else {
      optionFound = option.options.find(oo => oo.value === value);
    }
    if (optionFound) {
      return optionFound;
    }
  }
};

export const getDropdownOptions = (options: Readonly<DropdownOption[]>, value: string | string[] | undefined): DropdownOption[] => {
  if (!options || !value) {
    return [];
  }

  const foundOptions: DropdownOption[] = [];
  const valuesToSearch = isArray(value) ? value : [value];

  for (let i = 0; i < valuesToSearch.length; i++) {
    const optionFound = searchDropdownOption(options, valuesToSearch[i]);
    if (optionFound) {
      foundOptions.push(optionFound);
    }
  }

  return foundOptions;
};
