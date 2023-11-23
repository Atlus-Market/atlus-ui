import { AtlusModalContainer } from '@/components/ui/modal/container/atlus-modal-container';
import { AtlusModalHeader } from '@/components/ui/modal/atlus-modal-header';
import { AtlusCloseModalButton } from '@/components/ui/modal/atlus-close-modal-button';
import { AtlusModalTitle } from '@/components/ui/modal/atlus-modal-title';
import { AtlusModalFooter } from '@/components/ui/modal/atlus-modal-footer';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { AtlusModalBody } from '@/components/ui/modal/atlus-modal-body';

interface EmailChangeRequestedProps {
  requestedEmail: string;
  onCloseModal: () => void;
}

export const EmailChangeRequested = ({
  requestedEmail,
  onCloseModal,
}: EmailChangeRequestedProps) => {
  return (
    <AtlusModalContainer
      className="w-auto"
      header={
        <AtlusModalHeader>
          <AtlusModalTitle text="You’re almost done!" />
        </AtlusModalHeader>
      }
      footer={
        <AtlusModalFooter>
          <div className="w-full text-center">
            <AtlusButton
              type="submit"
              className="atlus-btn-45 md:atlus-btn-53"
              onClick={onCloseModal}
            >
              OK
            </AtlusButton>
          </div>
        </AtlusModalFooter>
      }
    >
      <AtlusModalBody>
        <span className="text-soft-black font-inter leading-5 md:leading-6 text-sm md:text-base">
          We sent a verification link to {requestedEmail}. Click on the link to finish updating your
          email address.
        </span>
      </AtlusModalBody>
    </AtlusModalContainer>
  );
};
