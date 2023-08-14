'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  hideEditPatentModal,
  updateSelectedPatent
} from '@/redux/features/set-package/set-package';
import { Patent } from '@/models/patent';
import {
  SetPatentModal
} from '@/app/set-package/(pages)/patents/components/set-patent-modal/set-patent-modal';
import {
  selectIsEditPatentModalOpen,
  selectPatentsListEditingPatent
} from '@/redux/features/set-package/selectors/set-package.selectors';

export const PatentsListSetPatentHandler = () => {
  const isSetPatentModalOpen = useAppSelector(selectIsEditPatentModalOpen);
  const editingPatent = useAppSelector(selectPatentsListEditingPatent);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(hideEditPatentModal());

  return (
    <SetPatentModal
      isOpen={isSetPatentModalOpen}
      closeModal={closeModal}
      editingPatent={editingPatent}
      onPatentAdded={(patent: Patent) => {
        dispatch(updateSelectedPatent({ patent }));
        closeModal();
      }}
      allowEditPublicationNumber={false}
    />
  );
};
