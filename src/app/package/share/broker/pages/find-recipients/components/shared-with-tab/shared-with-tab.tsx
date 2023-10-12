'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { fetchPackageAccess } from '@/redux/features/share-package/thunks/get-package-access';
import { selectPackageAccess } from '@/redux/features/share-package/selectors/find-recipients/shared-with.selectors';
import { ContactPackageAccess } from '@/app/package/share/broker/pages/find-recipients/components/shared-with-tab/contact-package-access';
import clsx from 'clsx';
import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';

export const SharedWithTab = () => {
  const dispatch = useAppDispatch();
  const packageAccess = useAppSelector(selectPackageAccess);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPackageAccess());
  }, [dispatch]);

  return (
    <div className={clsx(atlusModalBodyPaddingX)}>
      {packageAccess.map(contactPackageAccess => (
        <ContactPackageAccess
          key={contactPackageAccess.email}
          packageAccess={contactPackageAccess}
        />
      ))}
    </div>
  );
};
