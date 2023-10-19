import { InterestArea } from '@/models/interest-area';
import { defaultRevalidationTimeSeconds } from '@/constants/api';
import { createUrl } from '@/api/api';

export const revalidate = defaultRevalidationTimeSeconds;

export interface GetInterestAreasResponse {
  interestArea: InterestArea[];
}

export const getInterestAreas = (): Promise<GetInterestAreasResponse> =>
  fetch(`${createUrl('/interest-areas')}`, {
    next: { revalidate: defaultRevalidationTimeSeconds },
  }).then(res => res.json());
