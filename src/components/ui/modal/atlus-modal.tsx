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
  overlayClassName?: string;
}

export const AtlusModal = ({
                             isOpen = false,
                             children,
                             onAfterClose,
                             overlayClassName,
                             modalBodyClassName
                           }: AtlusModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={clsx('atlus-modal--overlay', overlayClassName)}
      onAfterClose={onAfterClose}
      className={clsx('atlus-modal-content', modalBodyClassName)}>
      {children}
    </Modal>
  );
};

Modal.setAppElement('#modals');
