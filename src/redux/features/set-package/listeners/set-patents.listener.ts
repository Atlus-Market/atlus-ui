import { ListenersMiddleware } from '@/redux/store';
import { patentsFetchedSuccessfully } from '@/redux/features/set-package/slices/add-patents/slices/enter-patents';
import { setAddPatentsStep, setPatents } from '@/redux/features/set-package/set-package';
import { AddPatentsStep } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/add-patents-step';

export const setPatentsListener = (appStartListening: ListenersMiddleware) => {
  appStartListening.startListening({
    actionCreator: patentsFetchedSuccessfully,
    effect: async (action, listenerApi) => {
      const { dispatch } = listenerApi;
      console.log('Fetch Patents Listener: ', action);
      const { patents, customPatents = [] } = action.payload;
      const allPatents = [...patents, ...customPatents];

      dispatch(setPatents({ patents: allPatents }));
      dispatch(setAddPatentsStep(AddPatentsStep.SelectPatents));
    },
  });
};
