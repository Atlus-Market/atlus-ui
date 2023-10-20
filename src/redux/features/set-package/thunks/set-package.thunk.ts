import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { selectPackageDetailsFormValues } from '@/redux/features/set-package/selectors/package-details.selectors';
import {
  createPackage,
  CreatePackageRequestPayload,
  CustomPatentPayload,
} from '@/api/package/create-package';
import { Package } from '@/models/package';
import { Patent } from '@/models/patent';
import {
  selectPackage,
  selectPackagePatents,
} from '@/redux/features/set-package/selectors/set-package.selectors';
import { updatePackage } from '@/api/package/update-package';
import { NO_FAMILY_GROUP_ID } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/use-table-group-patents-by-family';
import { getPatentId, mapPatentToCustomPatentPayload } from '@/utils/patents';
import { IPackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/package-details-form';
import { Visibility } from '@/components/common/dropdown/visibility-options';

export interface PersistPackageResult {
  package?: Package;
  createdPackage: boolean;
}

export const persistPackage = createAsyncThunk<PersistPackageResult, void, { state: RootState }>(
  'setPackage/persist',
  async (_, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const activePackage = selectPackage(getState());
      const allPatents: Patent[] = selectPackagePatents(getState());
      const packageDetails = selectPackageDetailsFormValues(getState());
      console.log('packageDetails: ', packageDetails);

      const payload: CreatePackageRequestPayload = packageDetailsFormToPersistPackagePayload(
        packageDetails,
        allPatents
      );

      if (activePackage) {
        const res = await updatePackage(activePackage.id, payload);
        console.log('UPDATE package Response: ', res);
        return {
          // No need to return the updated package since it's already loaded
          createdPackage: false,
        };
      } else {
        const res = await createPackage(payload);
        console.log('CREATE package Response: ', res);
        return {
          createdPackage: true,
          package: res.package,
        };
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);

const getCustomPatents = (patents: Patent[]): CustomPatentPayload[] => {
  return patents.filter(p => p.familyId === NO_FAMILY_GROUP_ID).map(mapPatentToCustomPatentPayload);
};

const packageDetailsFormToPersistPackagePayload = (
  packageDetails: IPackageDetailsForm,
  allPatents: Patent[]
): CreatePackageRequestPayload => {
  const patents = allPatents.filter(p => p.familyId !== NO_FAMILY_GROUP_ID);
  const customPatents = allPatents.filter(p => p.familyId === NO_FAMILY_GROUP_ID);
  const patentsIds = patents.map(p => getPatentId(p));

  console.log('patents: ', patents);
  console.log('customPatents: ', customPatents);
  console.log('getPatentsIds: ', patentsIds);

  return {
    ...packageDetails,
    keywords: packageDetails.keywords.join(','),
    patents: patentsIds,
    customPatents: getCustomPatents(customPatents),
    products: packageDetails.products.join(','),
  };
};
