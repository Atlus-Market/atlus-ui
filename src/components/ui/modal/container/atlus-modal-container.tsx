import { ReactNode } from 'react';

import './atlus-modal-container.css';
import clsx from 'clsx';
import { useAtlusModalContext } from '@/components/ui/modal/use-atlus-modal-context';

export interface AtlusModalContainerProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyContainerClassName?: string;
}

export const AtlusModalContainer = ({
  header,
  footer,
  children,
  className,
  bodyContainerClassName,
}: AtlusModalContainerProps) => {
  const { size } = useAtlusModalContext();
  const isMediumSize = size === 'medium';
  const isDialogSize = size === 'dialog';

  return (
    <div className={clsx('modal-container md:!max-h-[800px]', className)}>
      {header && (
        <div
          className={clsx('modal-container-header', {
            'pt-4 pb-6 px-4 md:px-40 md:py-8': isMediumSize,
            'px-6 pt-6 pb-5 md:px-40 md:pt-40 md:pb-6': isDialogSize,
          })}
        >
          {header}
        </div>
      )}
      <div className={clsx('modal-container-body', bodyContainerClassName)}>{children}</div>
      {footer && <div className={clsx('modal-container-footer')}>{footer}</div>}
    </div>
  );
};
