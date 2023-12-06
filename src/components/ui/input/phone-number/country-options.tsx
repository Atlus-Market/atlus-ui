import CountryList, { Country } from 'country-list-with-dial-code-and-flag';
import { DropdownLabelWithIcon } from '@/components/ui/dropdown-list/dropdown-label-with-icon';
import { escapeRegExp } from '@/utils/regex';

export interface CountryOptionData {
  countryData: Country;
}

export const getCountryOptions = () => {
  const countries = CountryList.getAll();
  return countries.map(country => {
    const label: string = `${country.name} (${country.dialCode})`;
    return {
      label: (
        <DropdownLabelWithIcon label={label} icon={<div className="mr-5px">{country.flag}</div>} />
      ),
      value: country.code,
      data: {
        countryData: country,
      },
    };
  });
};

type CountryOption = ReturnType<typeof getCountryOptions>[number];

export const filterCountryOptions = (option: CountryOption, input: string) => {
  if (input) {
    const escapedInput = escapeRegExp(input);
    return (
      // @ts-ignore
      new RegExp(escapedInput, 'ig').test(option.data.data.countryData.name) ||
      // @ts-ignore
      new RegExp(escapedInput, 'ig').test(option.data.data.countryData.dialCode)
    );
  }
  return true;
};
