import { ReactNode, useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { setPackageDetails } from '@/redux/features/set-package/set-package';
import { IPackageDetailsForm } from '@/app/set-package/(pages)/package-details/package-details-form';
import { debounce } from 'lodash';

interface UpdateFormInStoreProps {
  children: ReactNode;
}

export const SetPackageDetailsInStore = ({ children }: UpdateFormInStoreProps) => {
  const dispatch = useAppDispatch();
  const formValues = useWatch();

  const saveFormValues = useMemo(
    () =>
      debounce((formValues: IPackageDetailsForm) => {
        dispatch(setPackageDetails(formValues));
      }, 250),
    [dispatch]
  );

  useEffect(() => {
    saveFormValues(formValues as IPackageDetailsForm);
  }, [saveFormValues, formValues]);

  return <>{children}</>;
};
