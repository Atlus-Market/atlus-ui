import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';

interface ConfirmDeleteAccountProps {
  isModalOpen: boolean;
  hideModal: () => void;
  onConfirmDeleteAccount: () => void;
  isRequestingDelete?: boolean;
}

export const ConfirmDeleteAccount = ({
  isModalOpen,
  hideModal,
  onConfirmDeleteAccount,
  isRequestingDelete,
}: ConfirmDeleteAccountProps) => {
  return (
    <AtlusAlertModal
      isOpen={isModalOpen}
      title="Delete this account?"
      text={
        <div className="font-inter text-sm md:text-base">
          <div className="pb-5">If you delete your account:</div>
          <ul className="list-disc list-inside pb-5 ">
            <li>
              <span className="font-bold">
                Your account will be permanently erased and cannot be restored
              </span>
            </li>
            <li>You won’t be able to log in anymore</li>
            <li>You will lose access to your profile, packages, contacts, and other data</li>
          </ul>
          <div>If you want to proceed, we’ll email you a link with the final step.</div>
        </div>
      }
      mainButton={{
        text: 'Delete account',
        onClick: onConfirmDeleteAccount,
        isLoading: isRequestingDelete,
      }}
      secondaryButton={{
        text: 'Cancel',
        onClick: hideModal,
        disabled: isRequestingDelete,
      }}
    />
  );
};
