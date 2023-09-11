import { useAppDispatch } from '@/redux/hooks';
import { showAddPatentsModal } from '@/redux/features/set-package/set-package';

export const useShowAddPatentsModal = () => {
  const dispatch = useAppDispatch();
  return {
    showAddPatentsModal: () => dispatch(showAddPatentsModal()),
  };
};
