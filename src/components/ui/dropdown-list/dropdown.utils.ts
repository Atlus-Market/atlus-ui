import { DropdownOption, ValueOptionType } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { isArray } from 'lodash';
import { isNullOrUndefined } from '@/utils/type-guard';

const searchDropdownOption = <T extends ValueOptionType>(
  options: Readonly<DropdownOption<T>[]>,
  value: T
): DropdownOption<T> | undefined => {
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    let optionFound = undefined;
    if (!option.options) {
      optionFound = option.value === value ? option : undefined;
    } else {
      optionFound = option.options.find(oo => oo.value === value);
    }
    if (!isNullOrUndefined(optionFound)) {
      return optionFound;
    }
  }
};

export const getDropdownOptions = <T extends ValueOptionType>(
  options: Readonly<DropdownOption<T>[]>,
  value: T | T[] | undefined
): DropdownOption<T>[] => {
  if (!options || isNullOrUndefined(value)) {
    return [];
  }

  const foundOptions: DropdownOption<T>[] = [];
  const valuesToSearch = isArray(value) ? value : [value];

  for (let i = 0; i < valuesToSearch.length; i++) {
    const optionFound = searchDropdownOption(options, valuesToSearch[i]);
    if (optionFound) {
      foundOptions.push(optionFound);
    }
  }

  return foundOptions;
};
