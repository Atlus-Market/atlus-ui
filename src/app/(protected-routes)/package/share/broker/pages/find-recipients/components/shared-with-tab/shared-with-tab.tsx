'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { fetchPackageAccess } from '@/redux/features/share-package/thunks/get-package-access';
import { selectPackageAccess } from '@/redux/features/share-package/selectors/find-recipients/shared-with.selectors';
import { ContactPackageAccess } from '@/app/(protected-routes)/package/share/broker/pages/find-recipients/components/shared-with-tab/contact-package-access';
import clsx from 'clsx';
import { atlusModalBodyPaddingX } from '@/components/ui/modal/atlus-modal-body';
import { AtlusPlaceholderImage } from '@/components/common/atlus-placeholder-image';
import SharedWithImage from '@/public/assets/images/shared_width.svg';

export const SharedWithTab = () => {
  const dispatch = useAppDispatch();
  const packageAccess = useAppSelector(selectPackageAccess);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPackageAccess());
  }, [dispatch]);

  const hasPeopleAccess = packageAccess.length > 0;

  return (
    <div className={clsx(atlusModalBodyPaddingX, 'min-h-[400px]')}>
      {hasPeopleAccess ? (
        packageAccess.map(contactPackageAccess => (
          <ContactPackageAccess
            key={contactPackageAccess.email}
            packageAccess={contactPackageAccess}
          />
        ))
      ) : (
        <div className="w-full flex justify-center items-center min-h-[inherit]">
          <AtlusPlaceholderImage
            image={SharedWithImage}
            imageAltText=""
            bottomText="See who you’ve shared the package with and manage their access"
          />
        </div>
      )}
    </div>
  );
};
