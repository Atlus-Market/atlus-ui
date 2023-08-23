import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { selectPatents } from '@/redux/features/set-package/selectors/set-package.selectors';
import { FamilyPatents } from '@/redux/features/set-package/set-package';
import {
  selectPackageDetailsFormValues
} from '@/redux/features/set-package/selectors/package-details.selectors';
import { createPackage, CreatePackagePayload } from '@/api/package/create-package';

export const persistPackage = createAsyncThunk<
  void,
  void,
  { state: RootState }>(
  'setPackage/persist',
  async (args, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const familyPatents: FamilyPatents = selectPatents(getState());
      const patentsIds = getPatentsIds(familyPatents);
      console.log('familyPatents: ', familyPatents);
      console.log('getPatentsIds: ', patentsIds);

      const packageDetails = selectPackageDetailsFormValues(getState());
      console.log('packageDetails: ', packageDetails);

      const payload: CreatePackagePayload = {
        seller_user_id: packageDetails.sellerId,
        title: packageDetails.title,
        description: packageDetails.description,
        keywords: packageDetails.keywords.join(','),
        industry_id: parseInt(packageDetails.industry[0], 10),
        visibility: packageDetails.visibility ? 1 : 0,
        patents: patentsIds,
        custom_patents: []
      };
      const res = await createPackage(payload);
      console.log('Set package Response: ', res);
    } catch (e) {
      console.error(e);
    }
  }
);


const getPatentsIds = (familyPatents: FamilyPatents): string[] => {
  return Object.values(familyPatents).flatMap(patents => patents.map(patent => patent.publicationNumber));
};
