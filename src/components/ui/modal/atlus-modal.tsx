'use client';

import Modal from 'react-modal';
import './atlus-modal.css';
import { ReactNode, useCallback } from 'react';
import clsx from 'clsx';
import {
  AtlusModalContextProvider,
  AtlusModalSize,
} from '@/components/ui/modal/atlus-modal-context';

interface AtlusModalProps {
  isOpen?: boolean;
  children: ReactNode;
  onRequestClose?: () => void;
  onAfterClose?: () => void; // should call the close modal function
  modalBodyClassName?: string;
  overlayClassName?: string;
  size?: AtlusModalSize;
}

export const AtlusModal = ({
  isOpen = false,
  children,
  onAfterClose,
  overlayClassName,
  modalBodyClassName,
  onRequestClose,
  size = 'medium',
}: AtlusModalProps) => {
  const internalAfterModalClosed = useCallback(() => {
    onAfterClose?.();

    /**
     * When using a ReactModal on top of another ReactModal, the class
     * 'ReactModal__Body--open' is not removed from document.body.
     * See https://github.com/reactjs/react-modal/issues/759
     */
    setTimeout(() => {
      const allModalsClosed = Array.from(document.querySelectorAll('.ReactModalPortal')).every(
        reactModal => reactModal.children.length === 0
      );
      if (allModalsClosed) {
        window.document.body.classList.remove('ReactModal__Body--open');
      }
    }, 100);
  }, [onAfterClose]);

  return (
    <AtlusModalContextProvider size={size}>
      <Modal
        isOpen={isOpen}
        overlayClassName={clsx('atlus-modal--overlay', overlayClassName)}
        onAfterClose={internalAfterModalClosed}
        shouldCloseOnOverlayClick={true}
        onRequestClose={onRequestClose}
        className={clsx(
          'atlus-modal-content h-auto md:h-auto max-h-[90dvh] md:max-h-[792px]',
          modalBodyClassName
        )}
      >
        {children}
      </Modal>
    </AtlusModalContextProvider>
  );
};

Modal.setAppElement('#modals');
