'use client';

import { Patent as PatentModel } from '@/models/patent';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import {
  NO_FAMILY_GROUP_ID
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/use-table-group-patents-by-family';
import { useAppDispatch } from '@/redux/hooks';
import { deletePatent, showEditPatentModal } from '@/redux/features/set-package/set-package';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useState } from 'react';

interface ManageEditedPatentProps {
  patent: PatentModel;
}

export const ManageEditedPatent = ({ patent }: ManageEditedPatentProps) => {
  const [isShowingAlertModal, setIsShowingAlertModal] = useState<boolean>(false);
  const isCreatedManually = patent.familyId === NO_FAMILY_GROUP_ID;
  const dispatch = useAppDispatch();

  const hideAlertModal = () => setIsShowingAlertModal(false);

  return (
    <div className='flex items-start gap-2'>
      {isCreatedManually && <button
        onClick={() => dispatch(showEditPatentModal({ patentId: patent.publicationNumber }))}>
        <HiPencil className='text-middle-grey' />
      </button>}
      <button
        onClick={() => setIsShowingAlertModal(true)}>
        <HiTrash className='text-middle-grey' />
      </button>
      <AtlusAlertModal
        isOpen={isShowingAlertModal}
        title='Remove patent?'
        text='Remove this patent from your package.'
        mainButton={{
          text: 'Remove',
          onClick: () => {
            hideAlertModal();
            dispatch(deletePatent({ patentId: patent.publicationNumber }));
          }
        }}
        secondaryButton={{
          text: 'Cancel',
          onClick: hideAlertModal
        }}
      />
    </div>
  );
};
