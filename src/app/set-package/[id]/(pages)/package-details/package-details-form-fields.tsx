'use client';

import { SetPackageDetailsInStore } from '@/app/set-package/[id]/(pages)/package-details/set-package-details-in-store';
import { PackageDetailsTitle } from '@/app/set-package/[id]/(pages)/package-details/package-details-title';
import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';
import { AtlusFormDropdownList } from '@/components/ui/form/atlus-form-dropdown';
import { AtlusFormInputWithTags } from '@/components/ui/form/atlus-form-input-with-tags';
import { visibilityOptions } from '@/components/common/dropdown/visibility-options';
import { AtlusTitle } from '@/components/ui/typography/atlus-title';
import { AtlusFormInputNumeric } from '@/components/ui/form/atlus-form-input-numeric';
import { AtlusFormCheckbox } from '@/components/ui/form/atlus-form-checkbox';
import { Controller, useFormContext } from 'react-hook-form';
import { ContactsSelector } from '@/app/set-package/[id]/(pages)/package-details/contacts/contacts-selector';
import { IPackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/package-details-form';
import { useMemo } from 'react';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { InterestArea } from '@/models/interest-area';
import { dropdownNoOption, yesNoOptions } from '@/components/common/dropdown/yes-no-options';

interface PackageDetailsFormFieldsProps {
  interestArea: InterestArea[];
}

export const PackageDetailsFormFields = ({ interestArea }: PackageDetailsFormFieldsProps) => {
  const { register, control } = useFormContext<IPackageDetailsForm>();

  const interestAreasOptions = useMemo<DropdownOption<number>[]>(() => {
    return interestArea.map(ia => ({
      value: ia.id,
      label: ia.name,
    }));
  }, [interestArea]);

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

        <AtlusFormDropdownList
          label="Visibility"
          placeholder="Visibility"
          name="visibility"
          options={visibilityOptions}
          bottomText="Only people you share the package with can view it."
          showDropdownIndicator={true}
          isSearchable={false}
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
          wrapperClassName="mb-4 md:mb-6"
          label="Show pricing details publicly."
        />
      </div>

      <div>
        <AtlusTitle text="Seller information" className="!font-normal !text-2xl mb-6" />
        <div className="mb-6"></div>
        <Controller
          control={control}
          name="sellerUserId"
          render={({ field: { name, onChange, value } }) => (
            <ContactsSelector onSellerSelected={onChange} selectedSellerId={value} />
          )}
        />
      </div>
    </SetPackageDetailsInStore>
  );
};
