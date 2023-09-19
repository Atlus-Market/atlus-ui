import { toast } from 'react-toastify';

import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2';

interface AtlusNotificationProps {
  text: string;
  toastId?: string;
}

const defaultToastProps = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: true,
  closeButton: false,
};

export const showSuccessNotification = ({ text, toastId }: AtlusNotificationProps) =>
  toast.success(text, {
    ...defaultToastProps,
    toastId,
    icon: <HiOutlineCheckCircle className="text-green" size={18} />,
  });

export const showErrorNotification = ({ text, toastId }: AtlusNotificationProps) =>
  toast.success(text, {
    ...defaultToastProps,
    toastId,
    icon: <HiOutlineExclamationCircle className="text-red" size={18} />,
  });
