import { HiOutlineX } from 'react-icons/hi';
import { AtlusDialogModal } from '@/components/ui/modal/dialog/atlus-dialog-modal';
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
      <AtlusDialogModal
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
      <AtlusButton
        variant="icon-only"
        color="grey"
        className="atlus-btn-40"
        onClick={showAlertModal}
        disabled={isLoading}
        isLoading={isLoading}
        iconOnlyIcon={<HiOutlineX />}
      />
    </>
  );
};
