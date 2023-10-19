import { CountryCode } from '@/models/country-code';

export const worldWide: CountryCode = {
  name: 'Worldwide',
  alpha3: 'www',
  code: 'ww',
  numeric: 'ww',
  featured: 1,
};
export const getDefaultCountryCodes = (countryCodes: CountryCode[]): CountryCode[] => {
  return [worldWide, ...countryCodes.filter(cc => cc.featured === 1)];
};
