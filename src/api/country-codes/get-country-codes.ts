import { CountryCode } from '@/models/country-code';
import { defaultRevalidationTimeSeconds } from '@/constants/api';
import { createUrl } from '@/api/api';

export const revalidate = defaultRevalidationTimeSeconds;

export const getCountryCodes = (): Promise<CountryCode[]> =>
  fetch(createUrl('/country-codes')).then(res => res.json());
