import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { getInterestAreas } from '@/api/interest-areas/get-interest-areas';
import { SetPackageFooter } from '@/app/(main)/set-package/components/set-package-footer';
import { SavePackageButton } from '@/app/(main)/set-package/[id]/(pages)/package-details/save-package-button';
import { PackageDetailsForm } from '@/app/(main)/set-package/[id]/(pages)/package-details/package-details-form';
import { PackageDetailsFormFields } from '@/app/(main)/set-package/[id]/(pages)/package-details/package-details-form-fields';
import { getSepStandards } from '@/api/package/sep-standards/get-sep-standards';

export default async function PackageDetailsPage() {
  const [interestAreasResponse, sepStandards] = await Promise.all([
    getInterestAreas(),
    getSepStandards(),
  ]);

  console.log(sepStandards);

  return (
    <>
      <AtlusTitle text="Package Details" className="!font-normal !text-2xl mb-6" />
      <PackageDetailsForm>
        <PackageDetailsFormFields
          interestArea={interestAreasResponse.interestArea}
          sepStandards={sepStandards}
        />
        <SetPackageFooter>
          <SavePackageButton />
        </SetPackageFooter>
      </PackageDetailsForm>
    </>
  );
}
