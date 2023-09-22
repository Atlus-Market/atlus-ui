import { useMutation } from '@tanstack/react-query';
import { sendMessageToBroker } from '@/api/messages/send-message-to-broker';
import { showSuccessNotification } from '@/components/ui/notification/atlus-notification';

interface UseSendMessageProps {
  brokerId: string;
  packageId: string;
}

export const useSendMessage = ({ brokerId, packageId }: UseSendMessageProps) => {
  return useMutation({
    mutationFn: (content: string) =>
      sendMessageToBroker({
        recipientId: brokerId,
        packageId,
        content,
      }),
    onSuccess: () => {
      showSuccessNotification({
        text: 'Message sent correctly!',
      });
    },
  });
};
