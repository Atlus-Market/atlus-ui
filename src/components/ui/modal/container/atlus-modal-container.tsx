import { ReactNode } from 'react';

import './atlus-modal-container.css';

export interface AtlusModalContainerProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export const AtlusModalContainer = ({ header, footer, children }: AtlusModalContainerProps) => {
  return (
    <div className="modal-container">
      {header && <div className="modal-container-header">{header}</div>}
      <div className="modal-container-body">{children}</div>
      {footer && <div className="modal-container-footer">{footer}</div>}
    </div>
  );
};
