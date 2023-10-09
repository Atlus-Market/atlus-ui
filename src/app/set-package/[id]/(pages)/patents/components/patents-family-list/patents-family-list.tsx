'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { NoPatents } from '@/app/set-package/[id]/(pages)/patents/components/no-patents';
import { useFamilyPatentsHelper } from '@/app/set-package/[id]/(pages)/patents/hooks/use-family-patents-helper';
import { Header } from '@/app/set-package/[id]/(pages)/patents/components/patents-family-list/header';
import { PatentsFamily } from '@/app/set-package/[id]/(pages)/patents/components/patents-family-list/patents-family';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';
import { SetPackageFooter } from '@/app/set-package/components/set-package-footer';
import { selectPackagePatents } from '@/redux/features/set-package/selectors/set-package.selectors';
import { useGroupPatentsByFamilyId } from '@/app/set-package/[id]/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useState } from 'react';
import { removeFamilyPatents } from '@/redux/features/set-package/set-package';
import { useAtlusModal } from '@/components/ui/modal/use-atlus-modal';
import { useSetPackageUrls } from '@/app/set-package/hooks/use-set-package-urls';

export const PatentsFamilyList = () => {
  const dispatch = useAppDispatch();
  const { isShowingAlertModal, hideAlertModal, showAlertModal } = useAtlusModal();
  const [activeFamilyId, setActiveFamilyId] = useState<string>('');
  const patents = useAppSelector(selectPackagePatents);
  const familyIdPatentsGroup = useGroupPatentsByFamilyId({ patents });
  const { familiesCount, patentsCount, familyIds } = useFamilyPatentsHelper(patents);
  const setPackageUrls = useSetPackageUrls();

  const onHideAlertModal = () => {
    hideAlertModal();
    setActiveFamilyId('');
  };

  if (!familiesCount) {
    return <NoPatents />;
  }

  return (
    <div>
      <Header familiesCount={familiesCount} patentsCount={patentsCount} />
      <div>
        {familyIds.map(familyId => (
          <PatentsFamily
            key={familyId}
            familyId={familyId}
            patents={familyIdPatentsGroup[familyId]}
            onRemoveFamily={() => {
              setActiveFamilyId(familyId);
              showAlertModal();
            }}
          />
        ))}
      </div>
      <AtlusAlertModal
        isOpen={isShowingAlertModal}
        title="Remove family?"
        text="Remove this family and its patents from your package."
        mainButton={{
          text: 'Remove',
          onClick: () => {
            hideAlertModal();
            dispatch(removeFamilyPatents({ familyId: activeFamilyId }));
          },
        }}
        secondaryButton={{
          text: 'Cancel',
          onClick: onHideAlertModal,
        }}
      />
      <SetPackageFooter>
        <Link href={setPackageUrls.packageDetails} className="block">
          <AtlusButton variant="solid">Next</AtlusButton>
        </Link>
      </SetPackageFooter>
    </div>
  );
};
