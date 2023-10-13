'use client';

import { PackageAccessDropdown } from '@/app/package/share/broker/pages/find-recipients/components/shared-with-tab/change-package-access/package-access-dropdown';
import { PackageAccessValue } from '@/models/package-access-value';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changePackageAccess } from '@/redux/features/share-package/thunks/change-package-access';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useAtlusModal } from '@/components/ui/modal/use-atlus-modal';
import { selectIsChangingPackageAccessForEmail } from '@/redux/features/share-package/selectors/find-recipients/shared-with.selectors';
import { ChangePackageAccessMenu } from '@/app/package/share/broker/pages/find-recipients/components/shared-with-tab/change-package-access/change-package-access-menu';

interface ChangePackageAccessButtonProps {
  currentPackageAccessValue: PackageAccessValue;
  email: string;
}

export const ChangePackageAccessButton = ({
  currentPackageAccessValue,
  email,
}: ChangePackageAccessButtonProps) => {
  const dispatch = useAppDispatch();
  const { isShowingAlertModal, hideAlertModal, showAlertModal } = useAtlusModal();

  const isChangingEmailAccessToPackage = useMemo(() => {
    return selectIsChangingPackageAccessForEmail(email);
  }, [email]);

  const isLoading = useAppSelector(isChangingEmailAccessToPackage);

  const onChangeAccessSelected = useCallback(
    (packageAccessValue: PackageAccessValue) => {
      if (currentPackageAccessValue === packageAccessValue) {
        return;
      }
      const isRemovePackage = packageAccessValue === PackageAccessValue.NoAccess;
      if (isRemovePackage && !isShowingAlertModal) {
        showAlertModal();
        return;
      }
      // @ts-ignore
      dispatch(changePackageAccess({ email, access: packageAccessValue }));
    },
    [currentPackageAccessValue, isShowingAlertModal, dispatch, email, showAlertModal]
  );

  return (
    <>
      <PackageAccessDropdown
        packageAccessValue={currentPackageAccessValue}
        className="hidden md:block"
        onChangeAccessSelected={onChangeAccessSelected}
        isLoading={isLoading}
      />
      <ChangePackageAccessMenu
        className="block md:hidden"
        onChangeAccessSelected={onChangeAccessSelected}
        isLoading={isLoading}
      />
      {isShowingAlertModal && (
        <AtlusAlertModal
          isOpen={isShowingAlertModal}
          title="Remove access?"
          text="This person will no longer be able to view this package."
          mainButton={{
            text: 'Remove',
            onClick: () => {
              hideAlertModal();
              onChangeAccessSelected(PackageAccessValue.NoAccess);
            },
          }}
          secondaryButton={{
            text: 'Cancel',
            onClick: hideAlertModal,
          }}
        />
      )}
    </>
  );
};
