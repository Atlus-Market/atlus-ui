'use client';

import { ReactNode } from 'react';
import { atlusIconTagDataId } from '@/components/ui/tag/atlus-icon-tag';
import { useSelectCountry } from '@/app/onboarding/buyer/jurisdictions-of-interest/hooks/use-select-country';

interface CountryCodeSelectorProps {
  children: ReactNode;
}

export const CountryCodeSelector = ({ children }: CountryCodeSelectorProps) => {
  const { updateCountryCodesIdsList } = useSelectCountry();
  return (
    <div
      onClick={e => {
        e?.preventDefault();
        e?.stopPropagation();
        const target = e?.target as HTMLElement;
        const dataSet = target?.closest<HTMLElement>(`[data-${atlusIconTagDataId}]`)?.dataset;
        if (dataSet) {
          const selectedCountryCodeId: string | undefined = dataSet[atlusIconTagDataId] || '';
          updateCountryCodesIdsList(selectedCountryCodeId);
        }
      }}
    >
      {children}
    </div>
  );
};
