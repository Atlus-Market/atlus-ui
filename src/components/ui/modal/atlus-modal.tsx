'use client';

import Modal from 'react-modal';
import './atlus-modal.css';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface AtlusModalProps {
  isOpen?: boolean;
  children: ReactNode;
  onRequestClose?: () => void;
  onAfterClose?: () => void; // should call the close modal function
  modalBodyClassName?: string;
  overlayClassName?: string;
}

export const AtlusModal = ({
  isOpen = false,
  children,
  onAfterClose,
  overlayClassName,
  modalBodyClassName,
  onRequestClose,
}: AtlusModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={clsx('atlus-modal--overlay', overlayClassName)}
      onAfterClose={onAfterClose}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onRequestClose}
      className={clsx(
        'atlus-modal-content h-screen md:h-auto md:max-h-[792px]',
        modalBodyClassName
      )}
    >
      {children}
    </Modal>
  );
};

Modal.setAppElement('#modals');
