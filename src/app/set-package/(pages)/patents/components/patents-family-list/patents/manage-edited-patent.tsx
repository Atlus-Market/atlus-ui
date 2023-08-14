'use client';

import { Patent as PatentModel } from '@/models/patent';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import {
  NO_FAMILY_GROUP_ID
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/use-group-patents-by-family';
import { useAppDispatch } from '@/redux/hooks';
import { deletePatent, showEditPatentModal } from '@/redux/features/set-package/set-package';

interface ManageEditedPatentProps {
  patent: PatentModel;
}

export const ManageEditedPatent = ({ patent }: ManageEditedPatentProps) => {
  const isCreatedManually = patent.familyId === NO_FAMILY_GROUP_ID;
  const dispatch = useAppDispatch();

  if (!isCreatedManually) {
    return null;
  }
  return (
    <div className='flex items-start gap-2'>
      <button
        onClick={() => dispatch(showEditPatentModal({ patentId: patent.publicationNumber }))}>
        <HiPencil className='text-middle-grey' />
      </button>
      <button
        onClick={() => dispatch(deletePatent({ patentId: patent.publicationNumber }))}>
        <HiTrash className='text-middle-grey' />
      </button>
    </div>
  );
};