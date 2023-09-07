import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import {
  getInterestAreas,
  GetInterestAreasResponse
} from '@/api/interest-areas/get-interest-areas';
import { SetPackageFooter } from '@/app/set-package/components/set-package-footer';
import { SavePackageButton } from '@/app/set-package/components/save-package-button';
import { PackageDetailsForm } from '@/app/set-package/(pages)/package-details/package-details-form';
import {
  PackageDetailsFormFields
} from '@/app/set-package/(pages)/package-details/package-details-form-fields';

export default async function PackageDetailsPage() {
  const interestAreasResponse: GetInterestAreasResponse = await getInterestAreas();
  return (
    <div>
      <AtlusTitle text='Package Details' className='!font-normal !text-2xl mb-6' />
      <PackageDetailsForm>
        <PackageDetailsFormFields interestArea={interestAreasResponse.interestArea} />
        <SetPackageFooter>
          <SavePackageButton />
        </SetPackageFooter>
      </PackageDetailsForm>
    </div>
  );
}
