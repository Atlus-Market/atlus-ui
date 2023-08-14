'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  hideSetPatentModal,
  setEditedPatent,
  updatePatent
} from '@/redux/features/set-package/set-package';
import { Patent } from '@/models/patent';
import {
  SetPatentModal
} from '@/app/set-package/(pages)/patents/components/set-patent-modal/set-patent-modal';
import {
  selectEditingPatent,
  selectIsSetPatentModalOpen
} from '@/redux/features/set-package/selectors/add-patents-selectors';

export const SelectPatentSetPatentHandler = () => {
  const isSetPatentModalOpen = useAppSelector(selectIsSetPatentModalOpen);
  const editingPatent = useAppSelector(selectEditingPatent);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(hideSetPatentModal());

  return (
    <SetPatentModal
      isOpen={isSetPatentModalOpen}
      closeModal={closeModal}
      editingPatent={editingPatent}
      onPatentAdded={(patent: Patent) => {
        dispatch(updatePatent({ patent }));
        dispatch(setEditedPatent({ patentId: patent.publicationNumber }));
        closeModal();
      }}
    />
  );
};
