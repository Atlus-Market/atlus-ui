'use client';

import { CountryCode } from '@/api/country-codes/country-code';
import { Icon } from '@/components/ui/icon/icon';
import { worldWide } from '@/app/onboarding/buyer/jurisdictions-of-interest/components/default-country-codes';
import { HiGlobeAlt } from 'react-icons/hi2';
import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { AtlusIconTag } from '@/components/ui/tag/atlus-icon-tag';
import { AtlusTooltip } from '@/components/ui/tooltip/atlus-tooltip';
import { useMemo } from 'react';

interface CountryCodesListProps {
  countryCodes: CountryCode[];
}

const tooltipId = 'countries-tooltip';

export const CountryCodesList = ({ countryCodes }: CountryCodesListProps) => {
  const { countryCodesIds } = useOnboardingContext();
  const isWorldWideSelected = countryCodesIds.includes(worldWide.code);
  const existsCountries = countryCodes.length > 0;

  const countriesListMap = useMemo(() => {
    return countryCodes.map((cc, index) => {
      const isWorldWide = cc.code === worldWide.code;
      const iconFlag = isWorldWide ? (
        <HiGlobeAlt />
      ) : (
        <Icon name={`country-flags/${cc.code}.svg`} />
      );

      return (
        <div data-tooltip-id={tooltipId} key={`${cc.code}-${index}`} data-tooltip-content={cc.name}>
          <AtlusIconTag
            id={cc.code}
            text={cc.name}
            isActive={isWorldWide && isWorldWideSelected ? true : countryCodesIds.includes(cc.code)}
            disabled={!isWorldWide && isWorldWideSelected}
            icon={iconFlag}
            className="w-full"
          />
        </div>
      );
    });
  }, [countryCodes, countryCodesIds, isWorldWideSelected]);

  if (!existsCountries) {
    return (
      <div className="text-center text-lg leading-[22px] font-normal mt-[50px] w-full">
        This jurisdiction isn’t available or can’t be found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(216px,1fr))] gap-3 md:gap-6">
      {countriesListMap}
      <AtlusTooltip tooltipId={tooltipId} />
    </div>
  );
};
