'use client';

import {
  AtlusDropdownList,
  CustomSingleComponentProps,
  ExtraClassnames,
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { AtlusInput, AtlusInputProps } from '@/components/ui/input/atlus-input';
import { forwardRef, useMemo } from 'react';
import {
  CountryOptionData,
  getCountryOptions,
} from '@/components/ui/input/phone-number/country-options';
import { AtlusFormPhoneNumberInput } from '@/components/ui/form/atlus-form-phone-number-input';

export interface AtlusPhoneNumberInputProps extends AtlusInputProps {}

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

export const AtlusPhoneNumberInput = forwardRef<HTMLInputElement, AtlusFormPhoneNumberInput>(
  function AtlusPhoneNumberInput(props, ref) {
    const countryOptions = useMemo(getCountryOptions, []);

    const defaultCountryOption = useMemo(
      () => countryOptions.find(co => co.data.countryData.code === 'US'),
      [countryOptions]
    );

    return (
      <div className="flex gap-4">
        <AtlusDropdownList
          defaultValue={defaultCountryOption?.value}
          placeholder="Select country code"
          name="country_code"
          options={countryOptions}
          showDropdownIndicator={true}
          isSearchable={false}
          onChange={(valueEvent: any) => {
            console.log('Value: ', valueEvent);
          }}
          // isOpen={true}
          singleValue={SingleValueFlag}
          extraClassnames={extraClassnames}
        />
        <AtlusInput {...props} ref={ref} />
      </div>
    );
  }
);
