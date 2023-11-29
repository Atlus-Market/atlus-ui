import { defaultRevalidationTimeSeconds } from '@/constants/api';
import { createUrl } from '@/api/api';
import { Timezones } from '@/models/timezones';

export const revalidate = defaultRevalidationTimeSeconds;

export const getTimezones = (): Promise<Timezones> =>
  fetch(createUrl('/timezones')).then(res => res.json());
