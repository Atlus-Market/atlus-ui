import { ReactNode } from 'react';

import './atlus-modal-container.css';
import clsx from 'clsx';

export interface AtlusModalContainerProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export const AtlusModalContainer = ({
  header,
  footer,
  children,
  className,
  containerClassName,
}: AtlusModalContainerProps) => {
  return (
    <div className={clsx('modal-container w-screen md:w-auto', className)}>
      {header && <div className="modal-container-header">{header}</div>}
      <div className={clsx('modal-container-body', containerClassName)}>{children}</div>
      {footer && <div className="modal-container-footer">{footer}</div>}
    </div>
  );
};
