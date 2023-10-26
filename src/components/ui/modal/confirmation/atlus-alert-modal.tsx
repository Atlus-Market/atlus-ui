import { AtlusModal } from '@/components/ui/modal/atlus-modal';
import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';

export interface AtlusAlertButton {
  onClick: () => void;
  text: string;
}

interface AtlusAlertModalProps {
  isOpen: boolean;
  title: string;
  text: string;
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
                <AtlusButton variant="clear" color="dark-grey" onClick={secondaryButton.onClick}>
                  {secondaryButton.text}
                </AtlusButton>
              )}
              <AtlusButton variant="solid" color="orange" onClick={mainButton.onClick}>
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
