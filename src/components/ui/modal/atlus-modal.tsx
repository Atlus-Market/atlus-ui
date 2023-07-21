'use client';

import Modal from 'react-modal';
import './atlus-modal.css';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface AtlusModalProps {
  isOpen?: boolean;
  children: ReactNode;
  onAfterClose?: () => void;
  modalBodyClassName?: string;
}

export const AtlusModal = ({
                             isOpen = false,
                             children,
                             onAfterClose,
                             modalBodyClassName
                           }: AtlusModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName='atlus-modal--overlay'
      onAfterClose={onAfterClose}
      className={clsx('atlus-modal-content', modalBodyClassName)}>
      {children}
    </Modal>
  );
};

Modal.setAppElement('#modals');
