'use client';

import {
  SetPatentModal
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/set-patent-modal/set-patent-modal';
import { useDispatch } from 'react-redux';
import { hideSetPatentModal } from '@/redux/features/set-package/set-package';
import { useAppSelector } from '@/redux/hooks';
import {
  selectEditingPatent,
  selectIsSetPatentModalOpen
} from '@/redux/features/set-package/selectors/add-patents-selectors';

export const SetPatentHandler = () => {
  const dispatch = useDispatch();
  const isSetPatentModalOpen = useAppSelector(selectIsSetPatentModalOpen);
  const editingPatent = useAppSelector(selectEditingPatent);

  return (
    <SetPatentModal
      isOpen={isSetPatentModalOpen}
      closeModal={() => dispatch(hideSetPatentModal())}
      editingPatent={editingPatent}
    />
  );
};
