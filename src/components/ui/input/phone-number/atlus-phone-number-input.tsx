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
import CountryList from 'country-list-with-dial-code-and-flag';

export interface AtlusPhoneNumberInputProps extends AtlusInputProps {
  dialCodeInputName?: string;
  onCountryCodeChanged?: (countryCode: string) => void;
}

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
  function AtlusPhoneNumberInput({ dialCodeInputName, onCountryCodeChanged, ...restProps }, ref) {
    const countryOptions = useMemo(getCountryOptions, []);

    const defaultCountryOption = useMemo(
      () => countryOptions.find(co => co.data.countryData.code === 'US'),
      [countryOptions]
    );

    return (
      <div className="flex gap-4 w-full">
        <AtlusDropdownList
          wrapperClassName="shrink-0"
          defaultValue={defaultCountryOption?.value}
          placeholder="Select country code"
          name={dialCodeInputName}
          options={countryOptions}
          showDropdownIndicator={true}
          isSearchable={false}
          onChange={(countryCode: any) => {
            const country = CountryList.getAll().find(c => c.code === countryCode);
            if (country) {
              onCountryCodeChanged?.(country.dialCode);
            }
          }}
          singleValue={SingleValueFlag}
          extraClassnames={extraClassnames}
        />
        <AtlusInput {...restProps} ref={ref} wrapperClassName="w-full" />
      </div>
    );
  }
);
