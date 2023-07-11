import { CountryCode } from '@/api/country-codes/country-code';
import { defaultRevalidationTimeSeconds } from '@/constants/api';

export const revalidate = defaultRevalidationTimeSeconds;

export const getCountryCodes = (): Promise<CountryCode[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/country-codes`).then(res =>
    res.json()
  );
