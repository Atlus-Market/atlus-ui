import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
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
import { NO_FAMILY_GROUP_ID } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/select-patents/use-table-group-patents-by-family';
import { getPatentId, mapPatentToCustomPatentPayload } from '@/utils/patents';
import { IPackageDetailsForm } from '@/app/(main)/set-package/[id]/(pages)/package-details/package-details-form';

export interface PersistPackageResult {
  package: Package;
  createdPackage: boolean;
}

export const persistPackage = createAsyncThunk<
  PersistPackageResult,
  IPackageDetailsForm,
  { state: RootState }
>('setPackage/persist', async (packageDetailsFormValues, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const activePackage = selectPackage(getState());
    const allPatents: Patent[] = selectPackagePatents(getState());
    console.log('(thunk) packageDetails: ', packageDetailsFormValues);

    const payload: CreatePackageRequestPayload = packageDetailsFormToPersistPackagePayload(
      packageDetailsFormValues,
      allPatents
    );

    if (activePackage) {
      const res = await updatePackage(activePackage.id, payload);
      console.log('UPDATE package Response: ', res);
      return {
        package: res.package,
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
});

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
    patents: patentsIds,
    customPatents: getCustomPatents(customPatents),
  };
};
