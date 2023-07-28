import { ReactNode, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { setPackageDetails } from '@/redux/features/set-package/set-package';
import {
  IPackageDetailsForm
} from '@/app/set-package/(pages)/package-details/package-details-form';

interface UpdateFormInStoreProps {
  children: ReactNode;
}

export const SetPackageDetailsInStore = ({ children }: UpdateFormInStoreProps) => {
  const dispatch = useAppDispatch();
  const formValues = useWatch<IPackageDetailsForm>();

  useEffect(() => {
    dispatch(setPackageDetails(formValues as IPackageDetailsForm));
  }, [formValues]);

  return <>{children}</>;
};
