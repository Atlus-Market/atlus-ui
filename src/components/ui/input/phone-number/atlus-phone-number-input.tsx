'use client';

import {
  AtlusDropdownList,
  CustomSingleComponentProps,
  ExtraClassnames,
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { AtlusInput, AtlusInputProps } from '@/components/ui/input/atlus-input';
import { forwardRef, ReactNode, useMemo } from 'react';
import {
  CAcountry,
  CountryOptionData,
  defaultCountry,
  getCountryByCode,
  getCountryOptions,
  UScountry,
} from '@/components/ui/input/phone-number/country-options';
import { AtlusFormPhoneNumberInput } from '@/components/ui/form/atlus-form-phone-number-input';
import { Country } from 'country-list-with-dial-code-and-flag';
import { AtlusFormLabel } from '@/components/ui/form/atlus-form-label';

export interface AtlusPhoneNumberInputProps extends AtlusInputProps {
  dialCodeInputName: string;
  onCountryCodeChanged?: (countryCode: string) => void;
  defaultCountryCode?: Country['code'];
}

const SingleValueFlag = (props: CustomSingleComponentProps) => {
  const country = (props.data as CountryOptionData).countryData;
  let flag: ReactNode = country.flag;
  if (country.dialCode === defaultCountry.dialCode) {
    flag = (
      <span>
        {UScountry.flag}/{CAcountry.flag}
      </span>
    );
  }
  return (
    <div style={{ gridArea: '1/1/2/3' }} className="mb-[-3px] mr-4 min-w-[65px]">
      <span className="mr-2">{flag}</span>
      <span className="font-inter text-sm font-normal text-soft-black">{country.dialCode}</span>
    </div>
  );
};

const extraClassnames: ExtraClassnames = {
  menu: 'min-w-[300px]',
};

export const AtlusPhoneNumberInput = forwardRef<HTMLInputElement, AtlusFormPhoneNumberInput>(
  function AtlusPhoneNumberInput(
    { dialCodeInputName, label, defaultCountryCode, onCountryCodeChanged, ...restProps },
    ref
  ) {
    const countryOptions = useMemo(getCountryOptions, []);

    return (
      <div className="flex flex-col">
        <AtlusFormLabel htmlFor={restProps.id} label={label} />
        <div className="flex items-start gap-4 w-full">
          <AtlusDropdownList
            wrapperClassName="shrink-0"
            defaultValue={defaultCountryCode || defaultCountry.code}
            placeholder="Select country code"
            name={dialCodeInputName}
            options={countryOptions}
            showDropdownIndicator={true}
            isSearchable={false}
            onChange={(countryCode: string) => {
              const country = getCountryByCode(countryCode);
              if (country) {
                onCountryCodeChanged?.(country.dialCode);
              }
            }}
            singleValue={SingleValueFlag}
            extraClassnames={extraClassnames}
          />
          <AtlusInput {...restProps} ref={ref} wrapperClassName="w-full" />
        </div>
      </div>
    );
  }
);
