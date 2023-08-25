import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import {
  selectPackageDetailsFormValues
} from '@/redux/features/set-package/selectors/package-details.selectors';
import {
  createPackage,
  CreatePackageRequestPayload,
  CustomPatent
} from '@/api/package/create-package';
import { Package } from '@/models/package';
import { Patent } from '@/models/patent';
import {
  selectPackage,
  selectPackagePatents
} from '@/redux/features/set-package/selectors/set-package.selectors';
import { updatePackage } from '@/api/package/update-package';
import {
  NO_FAMILY_GROUP_ID
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/use-table-group-patents-by-family';

export const persistPackage = createAsyncThunk<
  Package,
  void,
  { state: RootState }>(
  'setPackage/persist',
  async (args, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const activePackage = selectPackage(getState());
      const patents: Patent[] = selectPackagePatents(getState());
      const patentsIds = patents.filter(p => p.familyId !== NO_FAMILY_GROUP_ID).map(p => p.publicationNumber);
      console.log('patents: ', patents);
      console.log('getPatentsIds: ', patentsIds);

      const packageDetails = selectPackageDetailsFormValues(getState());
      console.log('packageDetails: ', packageDetails);

      const payload: CreatePackageRequestPayload = {
        ...packageDetails,
        keywords: packageDetails.keywords.join(','),
        industryIds: packageDetails.industryIds.map(id => parseInt(id, 10)),
        visibility: packageDetails.visibility ? 1 : 0,
        patents: patentsIds,
        customPatents: getCustomPatents(patents)
      };

      if (activePackage) {
        const res = await updatePackage(activePackage.id, payload);
        console.log('UPDATE package Response: ', res);
        return {
          ...payload,
          ...activePackage
        };
      } else {
        const res = await createPackage(payload);
        console.log('CREATE package Response: ', res);
        return res.package;
      }

    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);


const getCustomPatents = (patents: Patent[]): CustomPatent[] => {
  return patents.filter(p => p.familyId === NO_FAMILY_GROUP_ID)
    .map(patent => ({
      patent_number: patent.publicationNumber,
      application_date: patent.applicationDate,
      application_number: patent.applicationNumber,
      assignee: patent.applicants.join(','),
      status: patent.status,
      title: patent.title
    }));
};
