import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';
import { ReactNode } from 'react';

export interface AtlusAlertButton {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
}

interface AtlusAlertModalProps {
  isOpen: boolean;
  title: string;
  text: ReactNode;
  mainButton: AtlusAlertButton;
  secondaryButton?: AtlusAlertButton;
}

export const AtlusAlertModal = ({
  isOpen,
  title,
  text,
  mainButton,
  secondaryButton,
}: AtlusAlertModalProps) => {
  return (
    <AtlusModal isOpen={isOpen} modalBodyClassName="!h-auto">
      <AtlusModalContainer
        className="!w-auto"
        header={
          <AtlusModalHeader>
            <AtlusModalTitle text={title} classNames="!text-2xl" />
          </AtlusModalHeader>
        }
        footer={
          <AtlusModalFooter>
            <div className="flex gap-8 justify-end items-center">
              {secondaryButton && (
                <AtlusButton
                  variant="clear"
                  color="dark-grey"
                  onClick={secondaryButton.onClick}
                  disabled={secondaryButton.disabled}
                  isLoading={secondaryButton.isLoading}
                >
                  {secondaryButton.text}
                </AtlusButton>
              )}
              <AtlusButton
                variant="solid"
                color="orange"
                onClick={mainButton.onClick}
                disabled={mainButton.disabled}
                isLoading={mainButton.isLoading}
              >
                {mainButton.text}
              </AtlusButton>
            </div>
          </AtlusModalFooter>
        }
      >
        <AtlusModalBody className="!pt-4">
          <span className="text-soft-black text-base font-normal">{text}</span>
        </AtlusModalBody>
      </AtlusModalContainer>
    </AtlusModal>
  );
};
