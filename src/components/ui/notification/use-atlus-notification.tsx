import { toast } from 'react-toastify';

import { HiOutlineCheckCircle } from 'react-icons/hi2';

export interface UseAtlusNotificationResult {
  showSuccessNotification: () => void;
}

export const useAtlusNotification = (): UseAtlusNotificationResult => {

  return {
    showSuccessNotification: () => toast.success('Success Notification !', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: false,
      hideProgressBar: true,
      icon: <HiOutlineCheckCircle color='#1CA843' size={18} />,
      closeButton: false
    })
  };
};
