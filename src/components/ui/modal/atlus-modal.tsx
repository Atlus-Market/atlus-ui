'use client';

import Modal from 'react-modal';
import './atlus-modal.css';
import { ReactNode } from 'react';

interface AtlusModalProps {
  isOpen?: boolean;
  children: ReactNode;
  onAfterClose?: () => void;
}

export const AtlusModal = ({ isOpen = false, children, onAfterClose }: AtlusModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName='atlus-modal--overlay'
      onAfterClose={onAfterClose}
      className='atlus-modal-content'>
      {children}
    </Modal>
  );
};

Modal.setAppElement('#modals');
