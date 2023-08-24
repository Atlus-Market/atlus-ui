import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import {
  selectPackageDetailsFormValues
} from '@/redux/features/set-package/selectors/package-details.selectors';
import { createPackage, CreatePackagePayload } from '@/api/package/create-package';
import { Package } from '@/models/package';
import { Patent } from '@/models/patent';
import { selectPackagePatents } from '@/redux/features/set-package/selectors/set-package.selectors';

export const persistPackage = createAsyncThunk<
  Package,
  void,
  { state: RootState }>(
  'setPackage/persist',
  async (args, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const patents: Patent[] = selectPackagePatents(getState());
      const patentsIds = patents.map(p => p.publicationNumber);
      console.log('patents: ', patents);
      console.log('getPatentsIds: ', patentsIds);

      const packageDetails = selectPackageDetailsFormValues(getState());
      console.log('packageDetails: ', packageDetails);

      const payload: CreatePackagePayload = {
        ...packageDetails,
        keywords: packageDetails.keywords.join(','),
        industryIds: packageDetails.industryIds.map(id => parseInt(id, 10)),
        visibility: packageDetails.visibility ? 1 : 0,
        patents: patentsIds,
        custom_patents: []
      };
      const res = await createPackage(payload);
      console.log('Set package Response: ', res);
      return res.package;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);
