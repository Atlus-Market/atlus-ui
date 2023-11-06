import { ReactNode, useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { setPackageDetailsForm } from '@/redux/features/set-package/set-package';
import { ExtendedPackageDetailsForm } from '@/app/set-package/[id]/(pages)/package-details/package-details-form';
import { debounce } from 'lodash';

interface UpdateFormInStoreProps {
  children: ReactNode;
}

export const SetPackageDetailsInStore = ({ children }: UpdateFormInStoreProps) => {
  const dispatch = useAppDispatch();
  const formValues = useWatch();

  const saveFormValues = useMemo(
    () =>
      debounce((formValues: ExtendedPackageDetailsForm) => {
        dispatch(setPackageDetailsForm(formValues));
      }, 250),
    [dispatch]
  );

  useEffect(() => {
    saveFormValues(formValues as ExtendedPackageDetailsForm);
  }, [saveFormValues, formValues]);

  return <>{children}</>;
};
