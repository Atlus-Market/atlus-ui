import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import {
  getInterestAreas,
  GetInterestAreasResponse
} from '@/api/interest-areas/get-interest-areas';
import {
  InterestAreaSelector
} from '@/app/onboarding/buyer/areas-of-interest/components/interest-area-selector';
import {
  InterestAreasList
} from '@/app/onboarding/buyer/areas-of-interest/components/interest-areas-list';
import { AtlusSubTitle } from '@/components/ui/typography/atlus-subtitle';

export default async function AreaOfInterestPage() {
  const interestAreasResponse: GetInterestAreasResponse = await getInterestAreas();
  return (
    <>
      <AtlusTitle
        text='What are your areas of interest?'
        className='mb-3 text-center'
      />
      <AtlusSubTitle
        text='Select all that apply'
        className='mb-12 text-center'
      />
      <div className='mx-auto max-w-[1000px]'>
        <InterestAreaSelector>
          <InterestAreasList interestAreas={interestAreasResponse.interestArea} />
        </InterestAreaSelector>
      </div>
    </>
  );
}
