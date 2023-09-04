import { HiOutlineX } from 'react-icons/hi';
import { AtlusAlertModal } from '@/components/ui/modal/confirmation/atlus-alert-modal';
import { useAppDispatch } from '@/redux/hooks';
import { useMutation } from '@tanstack/react-query';
import { sleep } from '@/utils/sleep';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { removeDocument } from '@/redux/features/set-package/set-package';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';
import { useAtlusModal } from '@/components/ui/modal/use-atlus-modal';

interface RemoveDocumentButtonProps {
  documentId: string;
}

export const RemoveDocumentButton = ({ documentId }: RemoveDocumentButtonProps) => {
  const { isShowingAlertModal, hideAlertModal, showAlertModal } = useAtlusModal();
  const dispatch = useAppDispatch();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (documentId: string) => {
      await sleep(500);
    }
  });

  const deleteDocument = async () => {
    try {
      await mutateAsync(documentId);
      dispatch(removeDocument({ documentId }));
      showSuccessNotification({ text: 'File removed successfully!' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isShowingAlertModal &&
        <AtlusAlertModal
          isOpen={isShowingAlertModal}
          title='Delete file?'
          text='This file will be deleted from your package.'
          mainButton={{
            text: 'Delete',
            onClick: () => {
              hideAlertModal();
              deleteDocument();
            }
          }}
          secondaryButton={{
            text: 'Cancel',
            onClick: hideAlertModal
          }}
        />
      }
      <AtlusButton
        variant='clear'
        onClick={showAlertModal}
        disabled={isLoading}
        isLoading={isLoading}>
        <HiOutlineX className='text-middle-grey' />
      </AtlusButton>
    </>
  );

};
