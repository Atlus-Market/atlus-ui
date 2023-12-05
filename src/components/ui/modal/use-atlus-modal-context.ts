import { useContext } from 'react';
import { AtlusModalContext } from '@/components/ui/modal/atlus-modal-context';

export const useAtlusModalContext = () => {
  const context = useContext(AtlusModalContext);

  if (!context) {
    throw new Error('useAtlusModalContext must be used within the AtlusModalContext');
  }

  return context;
};
