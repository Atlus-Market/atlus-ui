import { PackageDetails } from '@/app/set-package/(pages)/package-details/package-details';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import {
  getInterestAreas,
  GetInterestAreasResponse
} from '@/api/interest-areas/get-interest-areas';
import { SetPackageFooter } from '@/app/set-package/components/set-package-footer';
import { SetPackageButton } from '@/app/set-package/components/set-package-button';

export default async function PackageDetailsPage() {
  const interestAreasResponse: GetInterestAreasResponse = await getInterestAreas();
  return (
    <div>
      <AtlusTitle text='Package Details' className='!font-normal !text-2xl mb-6' />
      <PackageDetails interestArea={interestAreasResponse.interestArea} />
      <SetPackageFooter>
        <SetPackageButton />
      </SetPackageFooter>
    </div>
  );
}
