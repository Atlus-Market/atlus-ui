'use client';

import Modal from 'react-modal';
import './atlus-modal.css';
import { ReactNode } from 'react';

interface AtlusModalProps {
  isOpen?: boolean;
  children: ReactNode;
}

export const AtlusModal = ({ isOpen = false, children }: AtlusModalProps) => {
  return (
    <Modal isOpen={isOpen} overlayClassName='atlus-modal--overlay' className='atlus-modal-content'>
      {children}
    </Modal>
  );
};
