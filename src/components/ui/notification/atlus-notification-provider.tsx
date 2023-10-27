import { ToastContainer } from 'react-toastify';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './atlus-notification.css';

interface AtlusNotificationProviderProps {
  children: ReactNode;
}

export const AtlusNotificationProvider = ({ children }: AtlusNotificationProviderProps) => {
  return (
    <>
      <ToastContainer bodyClassName="text-sm text-soft-black font-medium leading-17 !p-0" />
      {children}
    </>
  );
};
