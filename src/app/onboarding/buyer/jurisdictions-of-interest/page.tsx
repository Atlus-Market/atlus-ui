import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { getCountryCodes } from '@/api/country-codes/get-country-codes';
import { CountryCodeSearch } from '@/app/onboarding/buyer/jurisdictions-of-interest/components/country-code-search';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';

export default async function CountriesOfInterestPage() {
  const countryCodes = await getCountryCodes();
  return (
    <>
      <AtlusTitle text="What are your jurisdictions of interest?" className="mb-3 text-center" />
      <AtlusSubTitle className="text-center mb-12" text="Select all that apply" />
      <CountryCodeSearch countryCodesDefinition={countryCodes} />
    </>
  );
}
