import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { getInterestAreas } from '@/api/interest-areas/get-interest-areas';
import { SetPackageFooter } from '@/app/set-package/components/set-package-footer';
import { SavePackageButton } from '@/app/set-package/[id]/(pages)/package-details/save-package-button';
import { PackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/package-details-form';
import { PackageDetailsFormFields } from '@/app/set-package/[id]/(pages)/package-details/package-details-form-fields';
import { getPackageStandards } from '@/api/package/get-package-standards';

export default async function PackageDetailsPage() {
  const [interestAreasResponse, packageStandards] = await Promise.all([
    getInterestAreas(),
    getPackageStandards(),
  ]);
  return (
    <>
      <AtlusTitle text="Package Details" className="!font-normal !text-2xl mb-6" />
      <PackageDetailsForm>
        <PackageDetailsFormFields
          interestArea={interestAreasResponse.interestArea}
          packageStandards={packageStandards.standards}
        />
        <SetPackageFooter>
          <SavePackageButton />
        </SetPackageFooter>
      </PackageDetailsForm>
    </>
  );
}
