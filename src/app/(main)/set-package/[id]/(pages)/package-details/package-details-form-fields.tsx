'use client';

import { SetPackageDetailsInStore } from '@/app/(main)/set-package/[id]/(pages)/package-details/set-package-details-in-store';
import { PackageDetailsTitle } from '@/app/(main)/set-package/[id]/(pages)/package-details/package-details-title';
import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';
import { AtlusFormDropdownList } from '@/components/ui/form/atlus-form-dropdown';
import { AtlusFormInputWithTags } from '@/components/ui/form/atlus-form-input-with-tags';
import { visibilityOptions } from '@/components/common/dropdown/visibility-options';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusFormInputNumeric } from '@/components/ui/form/atlus-form-input-numeric';
import { AtlusFormCheckbox } from '@/components/ui/form/atlus-form-checkbox';
import { useFormContext } from 'react-hook-form';
import { ContactsSelector } from '@/app/(main)/set-package/[id]/(pages)/package-details/contacts/contacts-selector';
import { ExtendedPackageDetailsForm } from '@/app/(main)/set-package/[id]/(pages)/package-details/package-details-form';
import { useEffect, useMemo } from 'react';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { InterestArea } from '@/models/interest-area';
import { dropdownNoOption, yesNoOptions } from '@/components/common/dropdown/yes-no-options';
import { packageStatusOptions } from '@/components/common/dropdown/package-status-options';
import { useGetPackageStatusActiveOption } from '@/app/(main)/set-package/[id]/(pages)/package-details/use-get-package-status-active-option';
import { SepStandard } from '@/models/sep-standard';

interface PackageDetailsFormFieldsProps {
  interestArea: InterestArea[];
  sepStandards: SepStandard[];
}

export const PackageDetailsFormFields = ({
  interestArea,
  sepStandards,
}: PackageDetailsFormFieldsProps) => {
  const { register, getValues, control, setValue, watch } =
    useFormContext<ExtendedPackageDetailsForm>();
  const packageStatusActiveOption = useGetPackageStatusActiveOption();

  const interestAreasOptions = useMemo<DropdownOption<number>[]>(() => {
    return interestArea.map(ia => ({
      value: ia.id,
      label: ia.name,
    }));
  }, [interestArea]);

  const packageStandardsOptions = useMemo<DropdownOption<number>[]>(() => {
    return sepStandards.map(sepStandard => ({
      value: sepStandard.id,
      label: sepStandard.name,
    }));
  }, [sepStandards]);

  const packageContainsSep = watch('containsSep');

  useEffect(() => {
    if (!packageContainsSep) {
      // Setting this to keep form.sepStandards = []
      // When submitting, yup transform returns the correct value anyway.
      setValue('sepStandardIds', []);
    }
  }, [packageContainsSep, setValue]);

  return (
    <SetPackageDetailsInStore>
      <div className="pb-[44px]">
        <PackageDetailsTitle />

        <AtlusFormTextarea
          label="Description"
          placeholder="Write a description for your package"
          {...register('description')}
        />

        <AtlusFormDropdownList
          label="Industries"
          placeholder="Choose an industry"
          name="industryIds"
          options={interestAreasOptions}
          showDropdownIndicator={true}
          isMulti={true}
          isSearchable={false}
        />

        <AtlusFormInputWithTags
          label="Keywords"
          placeholder="Type and press Enter to add a keyword"
          type="text"
          name="keywords"
        />

        <AtlusFormInputWithTags
          label="Products"
          placeholder="Enter products that use this package (e.g. YouTube, Apple, iPhone, etc.)"
          type="text"
          name="products"
        />

        <AtlusFormDropdownList
          label="Package contains SEPs"
          placeholder="Package contains SEPs"
          name="containsSep"
          options={yesNoOptions}
          defaultValue={dropdownNoOption.value}
          showDropdownIndicator={true}
          isSearchable={false}
        />

        {packageContainsSep && (
          <AtlusFormDropdownList
            label="Standards"
            placeholder="Choose one or many standards"
            name="sepStandardIds"
            options={packageStandardsOptions}
            showDropdownIndicator={true}
            isSearchable={false}
            isMulti={true}
          />
        )}

        <AtlusFormDropdownList
          label="Visibility"
          placeholder="Visibility"
          name="visibility"
          options={visibilityOptions}
          bottomText="Only people you share the package with can view it."
          showDropdownIndicator={true}
          isSearchable={false}
        />

        <AtlusFormDropdownList
          label="Status"
          placeholder="Status"
          name="status"
          options={packageStatusOptions}
          bottomText={packageStatusActiveOption?.data?.description as string}
          showDropdownIndicator={true}
          isSearchable={false}
          wrapperClassName="!mb-0"
        />
      </div>

      <div className="pb-[44px]">
        <AtlusTitle text="Pricing" className="!font-normal !text-2xl mb-6" />

        <AtlusFormInputNumeric
          label="Price (in USD)"
          placeholder="Enter price"
          {...register('priceUsd', { valueAsNumber: true })}
        />

        <AtlusFormCheckbox
          {...register('openToLicensing')}
          wrapperClassName="mb-4 md:mb-6"
          label="This package is open to licensing."
        />

        <AtlusFormCheckbox
          {...register('showPublicPricing')}
          wrapperClassName="mb-0"
          label="Show pricing details publicly."
        />
      </div>

      <div>
        <AtlusTitle text="Seller information" className="!font-normal !text-2xl mb-6" />
        <div className="mb-6"></div>
        <ContactsSelector />
      </div>
    </SetPackageDetailsInStore>
  );
};
