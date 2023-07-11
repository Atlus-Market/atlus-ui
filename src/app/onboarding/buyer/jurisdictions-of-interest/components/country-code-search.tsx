'use client';

import { AtlusInputSearch } from '@/components/ui/input/atlus-input-search';
import { CountryCode } from '@/api/country-codes/country-code';
import { useEffect, useMemo, useState } from 'react';
import { CountryCodesList } from '@/app/onboarding/buyer/jurisdictions-of-interest/components/country-codes-list';
import {
  getDefaultCountryCodes,
  worldWide,
} from '@/app/onboarding/buyer/jurisdictions-of-interest/components/default-country-codes';
import { CountryCodeSelector } from '@/app/onboarding/buyer/jurisdictions-of-interest/components/country-code-selector';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { useSelectCountry } from '@/app/onboarding/buyer/jurisdictions-of-interest/hooks/use-select-country';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';

interface CountryCodeSearchProps {
  countryCodesDefinition: CountryCode[];
}

export const CountryCodeSearch = ({
  countryCodesDefinition,
}: CountryCodeSearchProps) => {
  const { updateCountryCodesIdsList } = useSelectCountry();
  const { countryCodesIds } = useOnboardingContext();
  const [searchText, setSearchText] = useState<string>('');
  const [countryCodesResult, setCountryCodesResult] = useState<CountryCode[]>(
    []
  );

  const defaultCountryCodes = useMemo(() => {
    return getDefaultCountryCodes(countryCodesDefinition);
  }, [countryCodesDefinition]);

  useEffect(() => {
    if (!searchText) {
      setCountryCodesResult(defaultCountryCodes); // MUST SHOWN DEFAULT LIST
      return;
    }
    const filteredCountryCodes = countryCodesDefinition.filter(cc =>
      new RegExp(searchText, 'ig').test(cc.name)
    );
    setCountryCodesResult(filteredCountryCodes);
  }, [searchText, countryCodesDefinition, defaultCountryCodes]);

  const selectedCountryCodeTags = useMemo(() => {
    const isWorldWideSelected = countryCodesIds.includes(worldWide.code);
    let selectedCountryCodes: CountryCode[];
    if (isWorldWideSelected) {
      selectedCountryCodes = [worldWide];
    } else {
      selectedCountryCodes = countryCodesDefinition.filter(cc =>
        countryCodesIds.includes(cc.code)
      );
    }
    return selectedCountryCodes.map(cc => (
      <AtlusTag
        key={cc.code}
        text={cc.name}
        onClose={() => updateCountryCodesIdsList(cc.code)}
        className="m-1"
      />
    ));
  }, [countryCodesDefinition, countryCodesIds, updateCountryCodesIdsList]);

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="mb-[25px]">
        <AtlusInputSearch
          onChange={setSearchText}
          searchResults={selectedCountryCodeTags}
        />
      </div>
      <CountryCodeSelector>
        <CountryCodesList countryCodes={countryCodesResult} />
      </CountryCodeSelector>
    </div>
  );
};
