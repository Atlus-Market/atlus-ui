import { InterestArea } from '@/api/interest-areas/interest-area';
import { defaultRevalidationTimeSeconds } from '@/constants/api';
import { createServerUrl } from '@/api/api';

export const revalidate = defaultRevalidationTimeSeconds;

export interface GetInterestAreasResponse {
  interestArea: InterestArea[];
};

export const getInterestAreas = (): Promise<GetInterestAreasResponse> =>
  fetch(`${createServerUrl('/interest-areas')}`, { next: { revalidate: defaultRevalidationTimeSeconds } }).then(res =>
    res.json()
  );
