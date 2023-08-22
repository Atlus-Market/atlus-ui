import { PackageDetails } from '@/app/set-package/(pages)/package-details/package-details';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import {
  getInterestAreas,
  GetInterestAreasResponse
} from '@/api/interest-areas/get-interest-areas';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';
import { SetPackageDocuments } from '@/constants/routes';
import { SetPackageFooter } from '@/app/set-package/components/set-package-footer';

export default async function PackageDetailsPage() {
  const interestAreasResponse: GetInterestAreasResponse = await getInterestAreas();
  return (
    <div>
      <AtlusTitle text='Package Details' className='!font-normal !text-2xl mb-6' />
      <PackageDetails interestArea={interestAreasResponse.interestArea} />
      <SetPackageFooter>
        <Link href={SetPackageDocuments}>
          <AtlusButton>Next</AtlusButton>
        </Link>
      </SetPackageFooter>
    </div>
  );
}
