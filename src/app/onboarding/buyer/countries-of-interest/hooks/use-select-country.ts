import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { useCallback } from 'react';
import { worldWide } from '@/app/onboarding/buyer/countries-of-interest/components/default-country-codes';

export const useSelectCountry = () => {
  const { updateContext, countryCodesIds } = useOnboardingContext();

  const updateCountryCodesIdsList = useCallback(
    (countryCodeId: string) => {
      if (!countryCodesIds) {
        return;
      }

      let updatedCountryCodesIds: string[] = [];

      if (worldWide.code === countryCodeId) {
        if (countryCodesIds.includes(worldWide.code)) {
          updatedCountryCodesIds = [];
        } else {
          updatedCountryCodesIds = [worldWide.code];
        }
        updateContext({
          countryCodesIds: updatedCountryCodesIds,
        });
        return;
      }

      if (countryCodesIds.includes(countryCodeId)) {
        updatedCountryCodesIds = countryCodesIds.filter(
          ccId => ccId !== countryCodeId
        );
      } else {
        updatedCountryCodesIds = [...countryCodesIds, countryCodeId];
      }
      updateContext({
        countryCodesIds: updatedCountryCodesIds,
      });
    },
    [updateContext, countryCodesIds]
  );

  return {
    updateCountryCodesIdsList,
  };
};
