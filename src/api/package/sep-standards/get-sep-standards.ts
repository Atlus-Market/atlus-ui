import { defaultRevalidationTimeSeconds } from '@/constants/api';
import { createUrl } from '@/api/api';
import { SepStandard } from '@/models/sep-standard';

export const revalidate = defaultRevalidationTimeSeconds;

export const getSepStandards = (): Promise<SepStandard[]> =>
  fetch(createUrl('/package/sep_standards')).then(res => res.json());
