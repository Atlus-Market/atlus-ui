import { ListenersMiddleware } from '@/redux/store';
import {
  patentsFetchedSuccessfully
} from '@/redux/features/set-package/slices/add-patents/slices/enter-patents';
import { Patent } from '@/models/patent';
import { setAddPatentsStep, setPatents } from '@/redux/features/set-package/set-package';
import {
  AddPatentsStep
} from '@/app/set-package/(pages)/patents/components/add-patents/add-patents-step';
import {
  NO_FAMILY_GROUP_ID
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/use-table-group-patents-by-family';

export const startAddPatentsListeners = (listenerMiddleware: ListenersMiddleware) => {
  [setPatentsListener].forEach(fn => fn(listenerMiddleware));
};

const createPatentManually = (patentData: Partial<Patent>): Patent => ({
  publicationNumber: '',
  status: '',
  applicationNumber: '',
  familyId: NO_FAMILY_GROUP_ID,
  title: '',
  patentNumber: '',
  applicants: [],
  applicationDate: '',
  ...patentData
});

const setPatentsListener = (appStartListening: ListenersMiddleware) => {
  appStartListening.startListening({
    actionCreator: patentsFetchedSuccessfully,
    effect: async (action, listenerApi) => {
      const { dispatch } = listenerApi;
      console.log('Effect patentsFetchedSuccessfully running: ', action);

      const { patents, customPatents = [] } = action.payload;
      if (!customPatents) {
        debugger;
      }
      const notFoundPatents = customPatents.map(({ publicationNumber }): Patent => createPatentManually({ publicationNumber }));

      console.log('fetchedPatents: ', patents);
      console.log('notFoundPatents: ', notFoundPatents);

      const allPatents = [
        ...patents,
        ...notFoundPatents
      ];

      dispatch(setPatents({ patents: allPatents }));
      dispatch(setAddPatentsStep(AddPatentsStep.SelectPatents));
    }
  });
};
