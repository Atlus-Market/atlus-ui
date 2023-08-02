import { CountryCode } from '@/api/country-codes/country-code';
import { defaultRevalidationTimeSeconds } from '@/constants/api';
import { createServerUrl } from '@/api/api';

export const revalidate = defaultRevalidationTimeSeconds;

export const getCountryCodes = (): Promise<CountryCode[]> =>
  fetch(createServerUrl('/country-codes')).then(res =>
    res.json()
  );
