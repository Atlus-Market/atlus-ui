import CountryList, { Country } from 'country-list-with-dial-code-and-flag';
import { DropdownLabelWithIcon } from '@/components/ui/dropdown-list/dropdown-label-with-icon';
import { escapeRegExp } from '@/utils/regex';

export interface CountryOptionData {
  countryData: Country;
}

export const defaultCountry = CountryList.findOneByCountryCode('US')!;

export const getCountryOptions = () => {
  const countries = CountryList.getAll();
  const countryOptions = countries.map(country => {
    const label = (
      <span className="font-inter text-sm font-medium">
        <span className="text-soft-black mr-4">{country.name}</span>
        <span className="text-dark-grey">{country.dialCode}</span>
      </span>
    );
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
  return [
    {
      options: countryOptions,
      label: 'Country codes',
      value: 'country_codes',
    },
  ];
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

export const getCountryByDialCode = (dialCode: string | undefined): Country[] => {
  if (!dialCode) {
    return [];
  }
  return CountryList.findByDialCode(dialCode);
};

export const getCountryByCode = (countryCode: string): Country | undefined => {
  return CountryList.findOneByCountryCode(countryCode);
};
