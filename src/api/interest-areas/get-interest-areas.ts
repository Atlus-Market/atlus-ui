import { InterestArea } from '@/api/interest-areas/interest-area';
import { defaultRevalidationTimeSeconds } from '@/constants/api';

export const revalidate = defaultRevalidationTimeSeconds;

export interface GetInterestAreasResponse {
  interestArea: InterestArea[];
};

export const getInterestAreas = (): Promise<GetInterestAreasResponse> =>
  fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/interest-areas`, { next: { revalidate: defaultRevalidationTimeSeconds } }).then(res =>
    res.json()
  );
