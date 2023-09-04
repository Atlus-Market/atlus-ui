import { useCallback, useState } from 'react';

export const useAtlusModal = (initialState = false) => {
  const [isShowingAlertModal, setIsShowingAlertModal] = useState<boolean>(initialState);

  const showAlertModal = useCallback(() => {
    setIsShowingAlertModal(true);
  }, []);

  const hideAlertModal = useCallback(() => {
    setIsShowingAlertModal(false);
  }, []);

  return {
    isShowingAlertModal,
    showAlertModal,
    hideAlertModal
  };
};
