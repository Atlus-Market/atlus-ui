'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  hideSetPatentModal,
  setEditedPatent,
  setRowSelectionState,
  updatePatent,
} from '@/redux/features/set-package/set-package';
import { Patent } from '@/models/patent';
import { SetPatentModal } from '@/app/set-package/[id]/(pages)/patents/components/set-patent-modal/set-patent-modal';
import {
  selectEditingPatent,
  selectEditingPatentInfo,
  selectIsSetPatentModalOpen,
  selectRowSelectionState,
} from '@/redux/features/set-package/selectors/add-patents.selectors';
import { getPatentId } from '@/utils/patents';

export const SelectPatentSetPatentHandler = () => {
  const isSetPatentModalOpen = useAppSelector(selectIsSetPatentModalOpen);
  const editingPatent = useAppSelector(selectEditingPatent);
  const editingPatentInfo = useAppSelector(selectEditingPatentInfo);
  const rowSelectionState = useAppSelector(selectRowSelectionState);
  const dispatch = useAppDispatch();

  if (!editingPatentInfo) {
    return;
  }

  const closeModal = () => dispatch(hideSetPatentModal());

  return (
    <SetPatentModal
      isOpen={isSetPatentModalOpen}
      closeModal={closeModal}
      editingPatent={editingPatent}
      onPatentAdded={(patent: Patent) => {
        dispatch(updatePatent({ patent }));
        dispatch(setEditedPatent({ patentId: getPatentId(patent) }));
        dispatch(
          setRowSelectionState({
            rowSelectionState: {
              ...rowSelectionState,
              [editingPatentInfo.rowId]: true,
            },
          })
        );
        closeModal();
      }}
    />
  );
};
