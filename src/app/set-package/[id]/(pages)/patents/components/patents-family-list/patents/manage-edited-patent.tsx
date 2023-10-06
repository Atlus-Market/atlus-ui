'use client';

import { Patent as PatentModel } from '@/models/patent';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { NO_FAMILY_GROUP_ID } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/use-table-group-patents-by-family';
import { useAppDispatch } from '@/redux/hooks';
import { removePatent, showEditPatentModal } from '@/redux/features/set-package/set-package';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useAtlusModal } from '@/components/ui/modal/use-atlus-modal';
import { getPatentId } from '@/utils/patents';

interface ManageEditedPatentProps {
  patent: PatentModel;
}

export const ManageEditedPatent = ({ patent }: ManageEditedPatentProps) => {
  const { isShowingAlertModal, hideAlertModal, showAlertModal } = useAtlusModal();
  const isCreatedManually = patent.familyId === NO_FAMILY_GROUP_ID;
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-start gap-2">
      {isCreatedManually && (
        <button onClick={() => dispatch(showEditPatentModal({ patentId: getPatentId(patent) }))}>
          <HiPencil className="text-middle-grey" />
        </button>
      )}
      <button onClick={showAlertModal}>
        <HiTrash className="text-middle-grey" />
      </button>
      <AtlusAlertModal
        isOpen={isShowingAlertModal}
        title="Remove patent?"
        text="Remove this patent from your package."
        mainButton={{
          text: 'Remove',
          onClick: () => {
            hideAlertModal();
            dispatch(removePatent({ patentId: getPatentId(patent) }));
          },
        }}
        secondaryButton={{
          text: 'Cancel',
          onClick: hideAlertModal,
        }}
      />
    </div>
  );
};
