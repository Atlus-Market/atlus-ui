'use client';

import {
  AtlusDropdownList,
  CustomSingleComponentProps,
  ExtraClassnames,
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { AtlusInput, AtlusInputProps } from '@/components/ui/input/atlus-input';
import { useMemo } from 'react';
import {
  CountryOptionData,
  getCountryOptions,
} from '@/components/ui/input/phone-number/country-options';

interface AtlusPhoneNumberInputProps extends AtlusInputProps {}

const SingleValueFlag = (props: CustomSingleComponentProps) => {
  const country = (props.data as CountryOptionData).countryData;
  return (
    <div style={{ gridArea: '1/1/2/3' }} className="mb-[-3px] min-w-[65px]">
      {country.flag} {country.dialCode}
    </div>
  );
};

const extraClassnames: ExtraClassnames = {
  menu: 'min-w-[300px]',
};

export const AtlusPhoneNumberInput = (props: AtlusPhoneNumberInputProps) => {
  const countryOptions = useMemo(getCountryOptions, []);

  const defaultCountryOption = countryOptions.find(co => co.data.countryData.code === 'US');

  console.log(defaultCountryOption);

  return (
    <div className="flex">
      <AtlusDropdownList
        defaultValue={defaultCountryOption?.value}
        placeholder="Select country code"
        name="country_code"
        options={countryOptions}
        // @ts-ignore
        // filterOption={filterCountryOptions}
        showDropdownIndicator={true}
        isSearchable={false}
        onChange={(valueEvent: any) => {
          console.log('Value: ', valueEvent);
        }}
        isOpen={true}
        singleValue={SingleValueFlag}
        extraClassnames={extraClassnames}
      />
      <AtlusInput {...props} />
    </div>
  );
};
