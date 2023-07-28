import { ReactNode, useEffect, useRef } from 'react';
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
  const dispatchRef = useRef<{ dispatch: typeof dispatch }>({ dispatch });
  dispatchRef.current = { dispatch };

  const formValues = useWatch<IPackageDetailsForm>();

  useEffect(() => {
    dispatchRef.current.dispatch(setPackageDetails(formValues as IPackageDetailsForm));
  }, [formValues]);

  return <>{children}</>;
};
