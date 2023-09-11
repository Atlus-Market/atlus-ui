import { HiOutlineX } from 'react-icons/hi';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useAppDispatch } from '@/redux/hooks';
import { useMutation } from '@tanstack/react-query';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { removeDocument } from '@/redux/features/set-package/set-package';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { useAtlusModal } from '@/components/ui/modal/use-atlus-modal';
import { removeFile } from '@/api/dataroom/remove-file';

interface RemoveDocumentButtonProps {
  dataroomId: string;
  documentId: string;
}

export const RemoveDocumentButton = ({ dataroomId, documentId }: RemoveDocumentButtonProps) => {
  const { isShowingAlertModal, hideAlertModal, showAlertModal } = useAtlusModal();
  const dispatch = useAppDispatch();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: [dataroomId, documentId],
    mutationFn: async () => {
      await removeFile(dataroomId, documentId);
    },
  });

  const deleteDocument = async () => {
    try {
      await mutateAsync();
      dispatch(removeDocument({ documentId }));
      showSuccessNotification({ text: 'Document removed successfully!' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isShowingAlertModal && (
        <AtlusAlertModal
          isOpen={isShowingAlertModal}
          title="Delete file?"
          text="This file will be deleted from your package."
          mainButton={{
            text: 'Delete',
            onClick: () => {
              hideAlertModal();
              deleteDocument();
            },
          }}
          secondaryButton={{
            text: 'Cancel',
            onClick: hideAlertModal,
          }}
        />
      )}
      <AtlusButton
        variant="clear"
        onClick={showAlertModal}
        disabled={isLoading}
        isLoading={isLoading}
      >
        <HiOutlineX className="text-middle-grey" />
      </AtlusButton>
    </>
  );
};
